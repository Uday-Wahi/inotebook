import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

const Signup = (props) => {
  const context = useContext(NoteContext);
  const { url } = context;
  let navigate = useNavigate();

  const [creds, setcreds] = useState({ name: "", email: "", password: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, password } = creds;
    const response = await fetch(`${url}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.authToken) {
      localStorage.setItem("notetoken", json.authToken);
      props.showAlert("Account Created Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("This Email already exists", "danger");
    }
  };

  const onChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleClick}
      className="d-flex flex-column align-items-center "
      style={{ marginTop: "3rem " }}>
      <div className="mb-3 w-75">
        <label htmlFor="Name" className="form-label">
          Full Name
        </label>
        <input
          required
          minLength={3}
          maxLength={26}
          type="text"
          className="form-control"
          id="Name"
          name="name"
          onChange={onChange}
        />
      </div>
      <div className="mb-3 w-75">
        <label htmlFor="Email" className="form-label">
          Email address
        </label>
        <input
          required
          type="email"
          className="form-control"
          id="Email"
          name="email"
          onChange={onChange}
        />
      </div>
      <div className="mb-3 w-75">
        <label htmlFor="Password" className="form-label">
          Password
        </label>
        <input
          required
          minLength={12}
          type="password"
          className="form-control"
          id="Password"
          name="password"
          onChange={onChange}
        />
      </div>
      <div className="mb-3 w-75">
        <label htmlFor="CPassword" className="form-label">
          Confirm Password
        </label>
        <input
          required
          type="password"
          className="form-control"
          id="CPassword"
          name="cpassword"
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-dark">
        Submit
      </button>
    </form>
  );
};

export default Signup;
