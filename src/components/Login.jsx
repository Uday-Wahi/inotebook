import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const url = process.env.REACT_APP_DOMAIN_URL;
  let history = useHistory();

  const [creds, setcreds] = useState({ email: "", password: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    const { email, password } = creds;
    const response = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.authToken) {
      localStorage.setItem("token", json.authToken);
      history.push("/");
      props.showAlert("Logged In Successfully", "success");
    } else {
      props.showAlert("Incorrect Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleClick}
      className="d-flex flex-column align-items-center"
      style={{ marginTop: "4rem" }}>
      <div className="mb-3 w-75">
        <label htmlFor="Email" className="form-label">
          Email address
        </label>
        <input
          required
          onChange={onChange}
          value={creds.email}
          type="email"
          className="form-control"
          id="Email"
          name="email"
          autoComplete="username"
        />
      </div>
      <div className="mb-3 w-75">
        <label htmlFor="Password" className="form-label">
          Password
        </label>
        <input
          required
          onChange={onChange}
          value={creds.password}
          type="password"
          className="form-control"
          id="Password"
          name="password"
          autoComplete="current-password"
        />
      </div>
      <button type="submit" className="btn btn-dark">
        Submit
      </button>
    </form>
  );
};

export default Login;
