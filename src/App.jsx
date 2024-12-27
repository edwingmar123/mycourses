import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./Principal";
import Carousel from "./components/Carousel";
import Home from "./Home";
import Register from "./page/Register";
import Login from "./page/Login";
import Perfil from "./page/Perfil";
import NavBars from "./NavBars";
import Examen from "./Examen";
import PrivateRoute from "./components/PrivateRoute"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Principal />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        
        {/* Rutas privadas */}
        
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />

        <Route path="/navbars" element={<NavBars />} />
        <Route path="/examen" element={<Examen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;