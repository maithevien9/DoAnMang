import "./ChangInfor.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
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
    <form class="wrapperupdate" style={styles.wrapperupdate}>
      <div className="wrapperHeader">
        <h1>Change User Information</h1>
        <p onClick={() => handleClose()}>Close</p>
      </div>
      <div class="center">
        <div class="item">
          <label>Name:</label>
          <input
            class="Name"
            name="name"
            ref={register({ required: true })}
            type="text"
            placeholder={props.DataInforUser[0].Name}
            onChange={handleTextName}
            value={valueName}
          ></input>
        </div>
        <div class="item">
          <label>Phone Number:</label>
          <input
            class="Phone"
            name="phone"
            ref={register({ required: true })}
            type="text"
            placeholder={props.DataInforUser[0].Phone}
            //placeholder="Insert..."
            onChange={handleTextPhone}
            value={valuePhone}
          ></input>
        </div>
        <div class="item">
          <label>Address:</label>
          <input
            class="Address"
            name="address"
            ref={register({ required: true })}
            type="text"
            placeholder={props.DataInforUser[0].Address}
            onChange={handleTextAddress}
            value={valueAddress}
          ></input>
        </div>
        {/* <div class="item">
          <label>Password:</label>
          <input
            class="Password"
            name="password"
            ref={register({ required: true })}
            type="password"
            placeholder="Insert..."
          ></input>
        </div> */}
        <div>
          <div
            // type="submit"
            // onSubmit={handleSubmit(onSubmit)}
            class="btnSubmit"
            onClick={() => HandleSubmitChangeInfor()}
          >
            SUBMIT
          </div>
        </div>
      </div>
    </form>
  );
}
var styles = {
  wrapperupdate: {
    height: 950,
    width: "100%",
    justifyContent: "spaceAround",
    borderRadius: 20,
  },
};

function mapStateToProps(state) {
  return {
    DataUser: state.DataUser,
    DataInforUser: state.DataInforUser,
  };
}
export default connect(mapStateToProps)(UpdateForm);
