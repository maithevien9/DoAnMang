import React, { useState, useEffect } from "react";
import "./App.scss";
import Authenication from "./Components/Authentication/index.jsx";
import Home from "./Components/Home/index.jsx";
import GetDataLogin from "./LocalStorage/GetDataLogin";
import store from "./Redux/Redux";
import { Provider } from "react-redux";
import Ap from "./Ap";

function App() {
  return (
    <Provider store={store}>
      <Ap />
    </Provider>
  );
}

export default App;
