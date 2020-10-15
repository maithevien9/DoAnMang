import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ProvideManage.scss";
import close from "../../../public/image/close.png";
import GetUser from "../../../RestAPI/Admin/GetUser";
import { connect } from "react-redux";
import provideManager from "../../../RestAPI/Admin/provideManager";

ProvideManage.propTypes = {};

ProvideManage.propTypes = {
  HandleProvideClose: PropTypes.func,
};
ProvideManage.Authenication = {
  HandleProvideClose: null,
};

function ProvideManage(props) {
  const { HandleProvideClose } = props;
  const [value, setValue] = useState(0);

  const HandleClose = () => {
    if (HandleProvideClose) {
      HandleProvideClose();
    }
  };
  const HandleSubmit = (ID) => {
    provideManager(ID, value)
      .then((json) => {
        var dataCheck = JSON.parse(JSON.stringify(json));
        console.log(dataCheck);
        console.log(dataCheck.dataString);
        if (dataCheck.dataString === "THANH_CONG") {
          alert("Success");
          GetUser()
            .then((json) => {
              var DataUser = JSON.parse(JSON.stringify(json));
              console.log(DataUser);
              props.dispatch({
                type: "SetData",
                data: DataUser.data,
              });
            })
            .catch((error) => {
              console.error(error + "fail");
            });
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };

  return (
    <div className="wrapperFull" style={{ display: "block", height: "100%", width: "100%" }}>
      <div className="wrapperHeader">
        <h2>Provide Manager Rights</h2>
        <button onClick={() => HandleClose()}></button>
      </div>
      <div className="wrapperProvide">
        <div className="HeaderForm">
          <p>ID</p>
          <p>Name</p>
          <p>Decentralization</p>
          <p>Authorization</p>
        </div>
        {props.arrUser.map((e) => (
          <div className="wrapperUser">
            <div className="wrapperID">{e.ID}</div>
            <div className="wrapperName">{e.Name}</div>

            <div className="wrapperDecentralization">
              <p>{e.decentralization}</p>
            </div>
            <div className="wrapperAuthorization">
              <div className="wrapperAuthorization2">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onClick={() => {
                    setValue(1);
                  }}
                />
                <p>Student</p>
                <input
                  className="wrapperBtn2"
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onClick={() => {
                    setValue(2);
                  }}
                />
                <p>Admin</p>

                <button
                  className="wrapperBtn3"
                  onClick={() => {
                    HandleSubmit(e.ID);
                  }}
                >
                  Submit
                  </button>
              </div>
            </div>
          </div>
        ))}
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
export default connect(mapStateToProps)(ProvideManage);
