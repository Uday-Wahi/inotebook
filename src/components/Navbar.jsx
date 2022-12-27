import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation().pathname;
  let navigate = useNavigate();
  const navClose = useRef(null);

  const handleClick = () => {
    navClose.current.click();
  };

  const handleLogout = () => {
    navClose.current.click();
    navigate("/login");
    localStorage.removeItem("notetoken");
  };

  return (
    <div className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" onClick={handleClick}>
          iNoteBook
        </Link>
        <button
          ref={navClose}
          type="button"
          className="navbar-toggler"
          data-bs-target="#mobile_menu"
          data-bs-toggle="collapse"
          aria-expanded="false"
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse collapse" id="mobile_menu">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location === "/" ? "active" : ""}`}
                to="/"
                aria-current="page"
                onClick={handleClick}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location === "/about" ? "active" : ""}`}
                to="/about"
                onClick={handleClick}>
                About
              </Link>
            </li>
          </ul>

          {!localStorage.getItem("notetoken") ? (
            <ul className="navbar-nav mb-lg-0 me-4">
              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle active"
                  data-bs-toggle="dropdown"
                  id="navbarDropdown"
                  role="button"
                  aria-expanded="false">
                  Login / Sign Up
                </Link>
                <ul
                  className="dropdown-menu bg-dark border rounded-3"
                  aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/login">
                      <i
                        className={`fas fa-sign-in-alt ${
                          location === "/login"
                            ? "text-white"
                            : "text-secondary"
                        }`}></i>
                      <span
                        className={`ms-2 ${
                          location === "/login"
                            ? "text-white"
                            : "text-secondary"
                        }`}
                        onClick={handleClick}>
                        Login
                      </span>
                    </Link>
                  </li>
                  <hr className="dropdown-divider text-secondary" />
                  <li>
                    <Link className="dropdown-item" to="/signup">
                      <i
                        className={`fas fa-user-plus ${
                          location === "/signup"
                            ? "text-white"
                            : "text-secondary"
                        }`}></i>
                      <span
                        className={`ms-2 ${
                          location === "/signup"
                            ? "text-white"
                            : "text-secondary"
                        }`}
                        onClick={handleClick}>
                        Sign Up
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <li>
              <Link
                className="dropdown-item"
                style={{ display: "unset" }}
                to="#">
                <i
                  className={`fas fa-sign-out-alt ${
                    location === "/logout" ? "text-white" : "text-secondary"
                  }`}></i>
                <span
                  className={`ms-2 ${
                    location === "/logout" ? "text-white" : "text-secondary"
                  }`}
                  onClick={handleLogout}>
                  Logout
                </span>
              </Link>
            </li>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
