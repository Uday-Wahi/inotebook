import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";

const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="about/*" element={<About />} />
              <Route path="login/*" element={<Login showAlert={showAlert} />} />
              <Route
                path="signup/*"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};
export default App;
