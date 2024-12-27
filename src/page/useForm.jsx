import { useState } from "react";

const useForm = (initialState = {}) => {
  const [datosFormulario, setDatosFormulario] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target; // Desestructuramos name y value
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const handleUpload = (url) => {
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      imagen: url,
    }));
  };

  const reset = () => {
    setDatosFormulario(initialState);
  };

  return [datosFormulario, handleChange, reset, handleUpload];
};

export default useForm;