import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Authentication.scss";
import br from "../../public/image/br.PNG";
import LoginAPI from "../../RestAPI/Login";
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
  const [dataLogin, setDatalogin] = useState({
    dataString: "KHONG_THANH_CONG",
    data: [],
    token: "",
  });

  // useEffect(() => {});
  const HandleLogin = async () => {
    // alert(user + " " + password);

    LoginAPI(user, password)
      .then((json) => {
        setDatalogin(json);
        console.log(dataLogin);
        console.log(json);
      })
      .catch((error) => {
        console.error(error + "fail");
      });

    if (dataLogin.dataString === "THANH_CONG") {
      if (handleLogin) {
        handleLogin();
      }
    } else {
      // alert("Login fail");
    }
  };
  function handleTextUser(e) {
    setUser(e.target.value);
  }
  function handleTextPass(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="wrapper1">
      <h3 className="header" style={styles.header}></h3>
      <div style={styles.wrapperLeft}></div>

      <div className="wrapper2" style={{ display: "inline-block" }}>
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
            onClick={HandleLogin}
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
    fontSize: 18,
    fontFamily: "Cochin",
  },
  textLogin: {
    color: "black",
    fontSize: 20,
    fontFamily: "Cochin",
  },
  header: {
    paddingLeft: 450,
    color: "white",
    fontSize: 50,
    fontFamily: "Cochin",
  },
  wrapperLeft: {
    backgroundImage: `url(${br})`,
    paddingTop: 521,
    height: 47,
    width: 800,
    display: "inline-block",
  },
  btnWrapper: {
    paddingLeft: 50,
    paddingTop: 100,
  },
};
export default Authenication;