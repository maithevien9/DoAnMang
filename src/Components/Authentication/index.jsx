import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Authentication.scss";
import br from "../../public/image/br.PNG";
import LoginAPI from "../../RestAPI/Login";
import SaveDataLogin from "../../LocalStorage/SaveDataLogin.js";
import SaveDataInforUser from "../../LocalStorage/SaveDataInforUser.js";
import GetInforUser from "../../RestAPI/User/GetInforUser.js";
import { connect } from "react-redux";
Authenication.propTypes = {
  handleLogin: PropTypes.func,
};
Authenication.Authenication = {
  handleLogin: null,
};
function Authenication(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = props;
  const [dataLogin, setDatalogin] = useState([]);

  // useEffect(() => {});
  const HandleLoginMain = async () => {
    // alert(user + " " + password);
    var DataLoginUser = [];
    LoginAPI(user, password)
      .then((json) => {
        DataLoginUser = JSON.parse(JSON.stringify(json));
        setDatalogin(json);
        if (DataLoginUser.dataString === "THANH_CONG") {
          if (handleLogin) {
            props.dispatch({
              type: "Login",
              data: DataLoginUser,
            });
            handleLogin();
            SaveDataLogin(DataLoginUser);
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
            if (DataLoginUser.data[0].IDGroup === 1) {
              props.dispatch({
                type: "setDataCheckAdmin",
                data: true,
              });
              props.dispatch({
                type: "setDataCheckManager",
                data: true,
              });
            }
            if (DataLoginUser.data[0].IDGroup === 2) {
              props.dispatch({
                type: "setDataCheckAdmin",
                data: false,
              });
              props.dispatch({
                type: "setDataCheckManager",
                data: true,
              });
            }
            if (DataLoginUser.data[0].IDGroup === 3) {
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
        } else {
          alert("Login fail");
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  function handleTextUser(e) {
    setUser(e.target.value);
  }
  function handleTextPass(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="wrapper1">
      <h3 className="header" style={styles.header}>
        Learning Resource Management System
      </h3>
      <div style={styles.wrapperLeft}></div>

      <div className="wrapper2" style={styles.wrapper2}>
        <div className="wrapperInput">
          <p style={styles.textLogin}>Username:</p>
          <input
            className="formInput"
            type="text"
            name="name"
            onChange={handleTextUser}
            value={user}
          />
        </div>
        <div className="wrapperInput">
          <p style={styles.textLogin}>Password:</p>
          <input
            className="formInput"
            type="text"
            value={password}
            onChange={handleTextPass}
          />
        </div>
        <div>
          <p className="textFg" style={styles.textLogin}>
            Forgot password?
          </p>
        </div>
        <div style={styles.btnWrapper}>
          <button
            className="btnLogin"
            style={styles.btnLogin}
            onClick={HandleLoginMain}
          >
            Login
          </button>
        </div>
        <br />
      </div>
    </div>
  );
}
var styles = {
  btnLogin: {
    color: "black",
    fontSize: 22,
    fontFamily: "Cochin",
  },
  textLogin: {
    color: "black",
    fontSize: 22,
    fontFamily: "Cochin",
  },
  header: {
    textAlign: "center",
    color: "white",
    fontSize: 50,
    fontFamily: "Cochin",
  },
  wrapperLeft: {
    backgroundImage: `url(${br})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "50%",
    width: 900,
    display: "inline-block",
    backgroundColor: "white",
  },
  wrapper2: {
    display: "inline-block",
    height: "50%",
    width: 400,
  },
  btnWrapper: {
    paddingLeft: 50,
    paddingTop: 50,
  },
};

function mapStateToProps(state) {
  return {
    DataUser: state.DataUser,
    DataFolderRoom: state.DataFolderRoom,
    FileFromFolder: state.FileFromFolder,
    DataBack: state.DataBack,
    IDRoom: state.IDRoom,
  };
}
export default connect(mapStateToProps)(Authenication);
