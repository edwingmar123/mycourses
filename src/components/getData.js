// src/api.js
import axios from "axios";
import Swal from "sweetalert2";

export const getData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data; // Devuelve los datos del usuario
  } catch (error) {
    console.log('Error en el GET:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const patchData = async (url, id, obj, requestType) => {
  const message = requestType === "patch" 
    ? "Perfil modificado exitosamente" 
    : "Operación exitosa";
    
  try {
    const response = await axios.patch(`${url}/${id}`, obj);
    if (response && response.status === 200) {
      Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
      return response.data; // Retorna los datos de la respuesta
    }
  } catch (error) {
    console.error("Error en el PATCH:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al realizar la operación.",
    });
    throw error; // Lanza el error para manejarlo en el componente
  }
};
