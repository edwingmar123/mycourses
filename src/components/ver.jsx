import React, { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../components/AuthContext"; // Usar el contexto de autenticación
import Swal from "sweetalert2";

const Carrusel = () => {
  const alturas = [
    1.45, 1.46, 1.47, 1.48, 1.49, 1.5, 1.51, 1.52, 1.53, 1.54, 1.55, 1.56, 1.57,
    1.58, 1.59, 1.6, 1.61, 1.62, 1.63, 1.64, 1.65, 1.66, 1.67, 1.68, 1.69, 1.7,
    1.71, 1.72, 1.73, 1.74, 1.75, 1.76, 1.77, 1.78, 1.79, 1.8, 1.81, 1.82, 1.83,
    1.84, 1.85, 1.86, 1.87, 1.88, 1.89, 1.9, 1.91, 1.92, 1.93, 1.94, 1.95, 1.96,
    1.97, 1.98, 1.99, 2.0,
  ];

  const { user } = useAuth(); // Obtener usuario autenticado
  const db = getFirestore(); // Instancia de Firestore
  const [currentIndex, setCurrentIndex] = useState(27); // Altura por defecto: 1.72 (índice 27)

  // Manejar el scroll del carrusel
  const handleScroll = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      setCurrentIndex((prev) => Math.min(prev + 1, alturas.length - 1));
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // Incrementar altura
  const handleIncrement = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, alturas.length - 1));
  };

  // Decrementar altura
  const handleDecrement = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Guardar altura en Firestore
  const saveAltura = async () => {
    if (!user) {
      Swal.fire("Error", "Debes iniciar sesión para guardar tu altura", "error");
      return;
    }

    try {
      const alturaCentrada = alturas[currentIndex]; // Altura seleccionada
      const userRef = doc(db, "users", user.uid); // Documento del usuario en Firestore

      // Guardar altura en el documento del usuario
      await setDoc(
        userRef,
        {
          height: alturaCentrada,
          updatedAt: new Date(),
        },
        { merge: true } // Actualizar sin sobrescribir otros datos
      );

      Swal.fire("Éxito", "Altura guardada correctamente", "success");
    } catch (error) {
      console.error("Error al guardar la altura:", error);
      Swal.fire("Error", "No se pudo guardar la altura", "error");
    }
  };

  return (
    <div className="carrusel-container" onWheel={handleScroll}>
      {/* Botón para disminuir la altura */}
      <button className="carrusel-button" onClick={handleDecrement}>
        -
      </button>

      {/* Carrusel con las alturas */}
      <div className="carrusel">
        {alturas.map((altura, index) => (
          <div
            key={index}
            className={`carrusel-item ${
              index === currentIndex ? "selected" : ""
            }`}
            style={{
              transform: `translateY(${-currentIndex * 50}px)`,
            }}
          >
            {altura.toFixed(2)} m
          </div>
        ))}
      </div>

      {/* Botón para incrementar la altura */}
      <button className="carrusel-button" onClick={handleIncrement}>
        +
      </button>

      {/* Botón para guardar la altura */}
      <button className="carrusel-button" onClick={saveAltura}>
        Guardar Altura
      </button>
    </div>
  );
};

export default Carrusel;



import React, { useState } from "react";
import app from "../components/Credenciales";
import { useAuth } from "../components/AuthContext";  
import { getFirestore, doc, collection, addDoc,setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Carrusel2 = () => {
  const edades = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60,
  ];

  const{ user } = useAuth();
  const db = getFirestore(app);
  const [currentIndex, setCurrentIndex] = useState(27);

  const handleScroll = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      setCurrentIndex((prev) => Math.min(prev + 1, edades.length - 1));
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleIncrement = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, edades.length - 1));
  };
  const handleDecrement = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  const saveEdad = async (edad) => {
    if (!user) {
      Swal.fire("Error", "Debes iniciar sesión para guardar tu edad", "error");
      return;
    }
    try {
      const edadCentrada = edades[currentIndex];
      const edadcollection =  doc( db, "users" , user.uid);

      await setDoc(edadcollection,
       {
        edad: edadCentrada,
        timestamp: new Date(),
      }, { merge: true });

      
      console.log("Edad guardada con ID:", edadcollection.id);
      console.log("Edad guardada en la base de datos:", edad);
      Swal.fire("Éxito", "Edad guardada en la base de datos", "success");
    } catch (error) {
      console.error("Error al guardar la edad:", error);
      Swal.fire("Error", "Error al guardar la edad", "error");
    }
  };
  return (
    <div className="carrusel-container" onWheel={handleScroll}>
      <button className="carrusel-button" onClick={handleDecrement}>
        -
      </button>
      <div className="carrusel">
        {edades.map((edad, index) => (
          <div
            key={index}
            className={`carrusel-item ${
              index === currentIndex ? "selected" : ""
            }`}
            style={{
              transform: `translateY(${-currentIndex * 50}px)`,
            }}
          >
            {edad.toFixed(2)} m
          </div>
        ))}
      </div>
      <button className="carrusel-button" onClick={handleIncrement}>
        +
      </button>

      <button
        className="carrusel-button"
        onClick={() => saveEdad(edades[currentIndex])}
      >
        Guardar
      </button>
    </div>
  );
};

export default Carrusel2;






<img src={rutina} alt="" />
<ul className="rutinas">
  <li className="rutina"><button className="button" >Crear rutina</button></li>
  <li className="rutina"><button className="button">Ver rutina</button></li>
  <li className="rutina"><button className="button" >yaaaaa</button></li>
  <li className="rutina"><button className="button" >yaaaa</button></li>
  <li className="rutina"><button className="button" >yaaaaa</button></li>
</ul>