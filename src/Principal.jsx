import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function Principal() {
  const navigate = useNavigate();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigate("/carousel");
    }, 3000);

    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div>
        <a target="_blank"></a>
        <a target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>

        <h1>Página Principal</h1>
        <p>Serás redirigido al carrusel en 3 segundos...</p>

        <Link to="/carousel">Ir al Carrusel</Link>
        <br />
        <Link to="/home">Home</Link>
      </div>
    </>
  );
}

export default Principal;
