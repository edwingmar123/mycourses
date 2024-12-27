import React, { useEffect, useState, useContext } from "react";
import useForm from "../page/useForm";
import { DivContainer } from "../styles/Styled";
import Swal from "sweetalert2";
import { AuthContext } from "../components/AuthContext"; 
import styled from "styled-components";
import NavBars from "../NavBars";

const Perfil = () => {
  const { userId, userName } = useContext(AuthContext); 
  const [datosFormulario, handleChange, reset, setDatosFormulario] = useForm({
    imagen: "",
    nom: "",
    email: "",
    pass: "",
    tlf: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        if (!response.ok) throw new Error("Error al cargar datos del usuario.");

        const usuario = await response.json();
        console.log("Datos del usuario cargados:", usuario); // Console log
        setImageUrl(usuario.imagen || "");
        setDatosFormulario(usuario);
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        Swal.fire("Error", "No se pudo cargar los datos del usuario.", "error");
      }
    };

    cargarDatos();
  }, [userId, setDatosFormulario]);

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !imageUrl) {
      return Swal.fire("Advertencia", "Ingrese una URL de imagen válida.", "warning");
    }

    // Validar que la URL sea válida
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(imageUrl)) {
      return Swal.fire("Advertencia", "Ingrese una URL de imagen válida.", "warning");
    }

    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagen: imageUrl }),
      });

      if (!response.ok) throw new Error("Error al guardar la imagen.");

      Swal.fire("Éxito", "Imagen guardada con éxito!", "success");
      console.log("Imagen guardada:", imageUrl); // Console log
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
      Swal.fire("Error", "No se pudo guardar la imagen.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    if (Object.values(datosFormulario).some(field => !field)) {
      return Swal.fire("Advertencia", "Complete todos los campos.", "warning");
    }

    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosFormulario),
      });

      if (!response.ok) throw new Error("Error al guardar los datos.");

      Swal.fire("Éxito", "Datos guardados con éxito!", "success");
      console.log("Datos guardados:", datosFormulario); // Console log
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Swal.fire("Error", "No se pudieron guardar los datos.", "error");
    }
  };

  return (
    <DivContainer>
      <h1>{userName || "Perfil"}</h1>
      <NavBars />
      
      {/* Formulario para guardar la imagen */}
      <Form onSubmit={handleImageSubmit}>
        <Label>
          URL de la imagen de perfil:
          <Input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Label>
        <Button type="submit">Guardar Imagen</Button>
      </Form>

      {imageUrl && <ProfileImage src={imageUrl} alt="Foto de Perfil" />}

      {/* Formulario para guardar los datos del usuario */}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nom"
          placeholder="Nombre"
          value={datosFormulario.nom}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={datosFormulario.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="pass"
          placeholder="Contraseña"
          value={datosFormulario.pass}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="tlf"
          placeholder="Teléfono"
          value={datosFormulario.tlf}
          onChange={handleChange}
        />
        <Button type="submit">Guardar Cambios</Button>
      </Form>
    </DivContainer>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfileImage = styled.img`
  margin-top: 20px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`;

export default Perfil;
