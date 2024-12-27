import React from "react";
import { Link } from "react-router-dom";
import NavBars from "./NavBars";
import Videos from "./Videos";
import Examen from "./Examen";
import styled from "styled-components";

// Estilos para el contenedor principal
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Estilos para el título principal
const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

// Estilos para el enlace
const StyledLink = styled(Link)`
  display: inline-block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

function Home() {
  return (
    <Container>
      <NavBars />
      <Title>Bienvenido  a Home</Title>
      <Videos />
      <Examen />
      <StyledLink to="/src/Principal.jsx">Ir al Formulario</StyledLink>
    </Container>
  );
}

export default Home;
