import React, { useState, useEffect } from "react";
import Authenication from "./Components/Authentication/index.jsx";
import Home from "./Components/Home/index.jsx";
import GetDataLogin from "./LocalStorage/GetDataLogin";
import CheckLogin from "./RestAPI/CheckLogin";
import { connect } from "react-redux";
import GetInforUser from "./RestAPI/User/GetInforUser";
function Ap(props) {
  const [valueLogin, setValueLogin] = useState(false);
  const [dataCheck, setDataCheck] = useState([]);
  useEffect(() => {
    if (props.DataUser.dataString === "THANH_CONG") {
      if (props.DataUser.data[0].IDGroup === 1) {
        props.dispatch({
          type: "setDataCheckAdmin",
          data: true,
        });
        props.dispatch({
          type: "setDataCheckManager",
          data: true,
        });
      }
      if (props.DataUser.data[0].IDGroup === 2) {
        props.dispatch({
          type: "setDataCheckAdmin",
          data: false,
        });
        props.dispatch({
          type: "setDataCheckManager",
          data: true,
        });
      }
      if (props.DataUser.data[0].IDGroup === 3) {
        props.dispatch({
          type: "setDataCheckAdmin",
          data: false,
        });
        props.dispatch({
          type: "setDataCheckManager",
          data: false,
        });
      }
    }
    GetInforUser(props.DataUser.token)
      .then((json) => {
        var DataInfor = JSON.parse(JSON.stringify(json));
        console.log(DataInfor);
        if (DataInfor.dataString === "THANH_CONG") {
          props.dispatch({
            type: "setDataInfor",
            data: DataInfor.data,
          });
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
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
    // GetInforUser(props.DataUser.token)
    //   .then((json) => {
    //     var DataInfor = JSON.parse(JSON.stringify(json));
    //     console.log("Dataaaa" + DataInfor.data[0]);
    //     if (DataInfor.dataString === "THANH_CONG") {
    //       props.dispatch({
    //         type: "setDataInfor",
    //         data: DataInfor.data,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error + "fail");
    //   });
  }
  function handleLogOut() {
    props.dispatch({
      type: "setDataCheckAdmin",
      data: true,
    });
    props.dispatch({
      type: "setDataCheckManager",
      data: true,
    });
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
