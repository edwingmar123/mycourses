import axios from "axios"
import Swal from "sweetalert2";

export const postData = async (url, data) => {
  await axios.post(url, data)
    .then(function (response) {
      if (response && response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Usuario Creado Exitosamente",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}