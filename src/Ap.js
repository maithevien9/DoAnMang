import React, { useState, useEffect } from "react";
import Authenication from "./Components/Authentication/index.jsx";
import Home from "./Components/Home/index.jsx";
import GetDataLogin from "./LocalStorage/GetDataLogin";
import CheckLogin from "./RestAPI/CheckLogin";
import { connect } from "react-redux";
function Ap(props) {
  const [valueLogin, setValueLogin] = useState(false);
  const [dataCheck, setDataCheck] = useState([]);
  useEffect(() => {
    CheckLogin(props.DataUser.token)
      .then((json) => {
        // setDataCheck(json);
        // console.log(dataCheck);
        var dataCheck = JSON.parse(JSON.stringify(json));
        console.log(dataCheck.dataString);
        if (dataCheck.dataString === "THANH_CONG") {
          setValueLogin(true);
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  }, []);
  function handleLogin() {
    setValueLogin(true);
  }
  function handleLogOut() {
    setValueLogin(false);
  }
  return (
    <div>
      {valueLogin ? (
        <Home handleLogOut={handleLogOut} />
      ) : (
        <Authenication handleLogin={handleLogin} />
      )}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    DataUser: state.DataUser,
  };
}
export default connect(mapStateToProps)(Ap);
