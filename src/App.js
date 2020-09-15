import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Authenication from "./Components/Authentication/index.jsx";
import Home from "./Components/Home/index.jsx";

function App() {
  const [valueLogin, setValueLogin] = useState(true);
  function handleLogin() {
    setValueLogin(true);
  }
  return (
    <div>
      {/* <Home /> */}
      {valueLogin ? <Home /> : <Authenication handleLogin={handleLogin} />}
      {/* <Home /> */}
      {/* <Authenication /> */}
    </div>
  );
}

export default App;
