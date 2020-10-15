import "./ChangInfor.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import BG from "../../../../public/image/bg2.jpg";
import ChangInforUserAPI from "../../../../RestAPI/User/ChangInforUserAPI.js";
UpdateForm.propTypes = {
  handleCloseFormInfor: PropTypes.func,
};
UpdateForm.Authenication = {
  handleCloseFormInfor: null,
};
function UpdateForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const { handleCloseFormInfor } = props;
  const [valueName, setValueName] = useState("");
  const [valuePhone, setValuePhone] = useState("");
  const [valueAddress, setValueAddress] = useState("");

  //const [valueName, setValueName] = useState("");
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleClose = () => {
    handleCloseFormInfor();
  };
  function handleTextName(e) {
    setValueName(e.target.value);
  }
  function handleTextPhone(e) {
    setValuePhone(e.target.value);
  }
  function handleTextAddress(e) {
    setValueAddress(e.target.value);
  }
  const HandleSubmitChangeInfor = () => {
    //   alert(
    //     props.DataUser.token +
    //       "/" +
    //       valueName +
    //       "/" +
    //       valuePhone +
    //       "/" +
    //       valueAddress
    //   );
    // };
    ChangInforUserAPI(props.DataUser.token, valueName, valuePhone, valueAddress)
      .then((json) => {
        var Data = JSON.parse(JSON.stringify(json));
        console.log(Data);
        if (Data.dataString === "THANH_CONG") {
          alert("THANH_CONG");
          var dataSend = [
            { Name: valueName, Phone: valuePhone, Address: valueAddress },
          ];

          console.log(dataSend);
          props.dispatch({
            type: "setDataInfor",
            data: dataSend,
          });
          handleCloseFormInfor();
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  return (
    <form className="wrapperupdate" style={styles.wrapperupdate}>
      <div className="wrapperLeft">
      </div>
      <div className="wrapperRight">
        <div className="wrapperHeader">
          <h1>Change User Information</h1>
          <button onClick={() => handleClose()}></button>
        </div>
        <div className="wrapperbody">
          <div className="center" style={styles.center}>

            <label>Name:</label>
            <input
              className="Name"
              name="name"
              ref={register({ required: true })}
              type="text"
              placeholder={props.DataInforUser[0].Name}
              onChange={handleTextName}
              value={valueName}
            ></input>


            <label>Phone Number:</label>
            <input
              className="Phone"
              name="phone"
              ref={register({ required: true })}
              type="text"
              placeholder={props.DataInforUser[0].Phone}
              onChange={handleTextPhone}
              value={valuePhone}
            ></input>


            <label>Address:</label>
            <input
              className="Address"
              name="address"
              ref={register({ required: true })}
              type="text"
              placeholder={props.DataInforUser[0].Address}
              onChange={handleTextAddress}
              value={valueAddress}
            ></input>

            <div>
              <div
                className="btnSubmit"
                onClick={() => HandleSubmitChangeInfor()}
              >
                SUBMIT
          </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
var styles = {
  wrapperupdate: {
    height: "100%",
    width: "100%",
    //justifyContent: "spaceAround",

  },
  center: {
    height: "100%",
    width: "70%",
  },

};

function mapStateToProps(state) {
  return {
    DataUser: state.DataUser,
    DataInforUser: state.DataInforUser,
  };
}
export default connect(mapStateToProps)(UpdateForm);
