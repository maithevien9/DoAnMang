import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Register.scss";
import close from "../../../public/image/close.png";
import GetUser from "../../../RestAPI/Admin/GetUser";
import { connect } from "react-redux";
import provideManager from "../../../RestAPI/Admin/provideManager";
import register from "../../../RestAPI/User/register.js";

Register.propTypes = {};

Register.propTypes = {
  HandleProvideClose2: PropTypes.func,
};
Register.Authenication = {
  HandleProvideClose2: null,
};

function Register(props) {
  const { HandleProvideClose2 } = props;
  const [value, setValue] = useState(0);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState("");

  const [dataRegister, setDataRegister] = useState([]);

  const HandleClose = () => {
    if (HandleProvideClose2) {
      HandleProvideClose2();
    }
  };
  const HandleRegister = async () => {
    alert(user + " / " + password + " / " + room);
    var DataRegisterUser = [];
    register(user, password, room)
      .then((json) => {
        DataRegisterUser = json;
        setDataRegister(json);
        if (DataRegisterUser.dataString === "THANH_CONG") {
          alert("Register Successfully");
          setUser("");
          setPassword("");
          setRoom("");
        } else {
          alert("Register fail");
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
  function handleTextRoom(e) {
    setRoom(e.target.value);
  }
  return (
    <div>
      <div className="wrapper">
        <div></div>
        <div></div>
        <div
          className="wrapperClose"
          onClick={() => {
            HandleClose();
          }}
        >
          <img
            // style={styles.imageLogoUser}
            src={close}
            alt="user"
          />
        </div>
      </div>
      <div className="wrapperFull">
        <h1>Register</h1>

        <div className="center">
          <div>
            <div className="wrapperForm">
              <b>Username</b>
            </div>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={handleTextUser}
              value={user}
            />
          </div>
          <div className="wrapperForm">
            <div>
              <b>Password</b>
            </div>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={handleTextPass}
            />
          </div>
          <div className="wrapperForm">
            <div>
              <b>Room</b>
            </div>
            <input
              type="text"
              placeholder="Enter Room"
              value={room}
              onChange={handleTextRoom}
            />
          </div>
          <hr />

          <button className="registerbtn" onClick={HandleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    arrUser: state.arrUser,
    DataUser: state.DataUser,
  };
}
export default connect(mapStateToProps)(Register);
