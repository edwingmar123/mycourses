import { useState } from "react";
import { Link } from "react-router-dom";
function Formulario() {
  /*  const [name, setname] = useState("");
  console.log(name);

  const [password, setpass] = useState("");
  const contra = password;

  const [emal, setemail] = useState("");
 */
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
  });

  const accionInput = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const manejo = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <>
      <div>
        <form onSubmit={manejo}>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={values.name}
            onChange={accionInput}
            className="input "
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={values.password}
            onChange={accionInput}
            className="input "
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={values.emal}
            onChange={accionInput}
            className="input "
          />
          <button Submit={() => setValues("")} className="button">
            enter
          </button>{" "}
          <p className="t">{values.name}</p>
          <p className="t">{values.email}</p>
          <p className="t">{values.password}</p>
        </form>
      </div>
    </>
  );
}

export default Formulario;
