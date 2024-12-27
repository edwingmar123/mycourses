import useForm from "../page/useForm";
import { Link, useNavigate } from "react-router-dom";
import { DivContainer, FormStyle } from "../styles/Styled";
import Swal from "sweetalert2";
import { db } from "../assets/db";
import react from "../assets/react.svg";

const Register = () => {
  const navigate = useNavigate();
  const [datosFormulario, handleChange, reset] = useForm({
    nom: "",
    email: "",
    pass: "",
    tlf: "",
  });

  const isEmailValid = /\S+@\S+\.\S+/.test(datosFormulario.email);
  const isPhoneValid = /^[0-9]{10}$/.test(datosFormulario.tlf);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El email no es válido",
      });
      return;
    }

    if (!isPhoneValid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El número de teléfono debe tener 10 dígitos",
      });
      return;
    }

    const obj = {
      id: new Date().getTime().toString(),
      nom: datosFormulario.nom,
      email: datosFormulario.email,
      pass: datosFormulario.pass,
      tlf: datosFormulario.tlf,
    };

    const userioRegistrado = db.user.find(
      (user) => user.email === obj.email || user.tlf === obj.tlf
    );

    if (userioRegistrado) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario ya está registrado con este email o teléfono",
      });
      return;
    }

    try {
      // Agregar el usuario al arreglo de `db.user`
      db.user.push(obj);

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Registro exitoso, puede iniciar sesión",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal durante el registro",
      });
    }

    reset();
  };

  return (
    <DivContainer>

      <img className="logo-tarea" src={react} alt="react" />

      <FormStyle onSubmit={handleSubmit}>
        <input
          type="text"
          id="nom"
          name="nom"
          placeholder="Ingrese Nombre"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ingrese Email"
          onChange={handleChange}
        />
        <input
          type="password"
          id="pass"
          name="pass"
          placeholder="Ingrese Password"
          onChange={handleChange}
        />
        <input
          type="text"
          id="tlf"
          name="tlf"
          placeholder="Ingrese teléfono"
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </FormStyle>
      <p>
        ¿Ya tienes Cuenta?
        <Link to="/Login">Inicia sesión aquí</Link>
      </p>
    </DivContainer>
  );
};

export default Register;
