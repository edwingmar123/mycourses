import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import useForm from "../page/useForm";
import { AuthContext } from "../components/AuthContext"; 
import { DivContainer, FormStyle } from "../styles/Styled";
import Swal from "sweetalert2";
import { db } from "../assets/db"; 
import react from "../assets/react.svg";

const Login = () => {
  const [datosFormulario, handleChange, reset] = useForm({
    input: "",
    pass: "",
  });

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { input, pass } = datosFormulario;
    const isEmail = /\S+@\S+\.\S+/.test(input); 
    const isPhone = /^[0-9]+$/.test(input); 
    // Buscar el usuario en el array db.user
    const usuarioEncontrado = db.user.find(
      (user) =>
        ((isEmail && user.email === input) || (isPhone && user.tlf === input)) &&
        user.pass === pass
    );

    if (usuarioEncontrado) {
      loginUser(usuarioEncontrado.nom); // Guarda el nombre del usuario en el contexto
      Swal.fire("Bienvenido").then(() => {
        navigate("/home"); // Redirige a la página de inicio
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos",
      });
    }

    reset(); // Reiniciar formulario
  };

  return (
    <DivContainer>
      <img className="logo-tarea" src={react} alt="react" />
      <div>
        <FormStyle onSubmit={handleSubmit}>
          <input
            type="text"
            id="input"
            name="input"
            placeholder="Ingrese Email o Teléfono"
            value={datosFormulario.input}
            onChange={handleChange}
          />
          <input
            type="password"
            id="pass"
            name="pass"
            placeholder="Ingrese Contraseña"
            value={datosFormulario.pass}
            onChange={handleChange}
          />
          <button type="submit">Iniciar Sesión</button>
        </FormStyle>
        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </DivContainer>
  );
};

export default Login;
