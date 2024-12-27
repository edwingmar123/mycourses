import axios from "axios";
import Swal from "sweetalert2";

export const patchData = async (url, id, obj, requestType) => {
  const message = requestType === "patch" ? "Perfil modificado exitosamente" : "Personaje eliminado exitosamente"
  await axios.patch(`${url}/${id}`, obj)
  .then(function (response) {
    if (response && response.status === 200) {
      Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
      return response
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
