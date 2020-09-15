import React from "react";
import PropTypes from "prop-types";
import Logo from "../../../public/image/Logo.png";
import Icon from "./Header.scss";
import Search from "../../../public/image/search.png";
import User from "../../../public/image/userr.png";

index.propTypes = {};

function index(props) {
  return (
    <div style={styles.wrapper} className="wrapper">
      <img style={styles.imageLogo} src={Logo} alt="Logo" />
      <div style={styles.wrapperInput}>
        <input
          style={styles.textInput}
          className="textInput"
          type="text"
          // onChange={handleTextUser}
          // value={user}
        ></input>
      </div>
      <div>
        <img className="" style={styles.imageLogoUser} src={User} alt="user" />
      </div>

      <img
        className="imageSearch"
        style={styles.imageLogoSearch}
        src={Search}
        alt="Logo"
      />
    </div>
  );
}
var styles = {
  wrapper: {
    height: 100,
    width: "100%",
    backgroundColor: "#A4D3EE",
    display: "flex",
    justifyContent: "spaceAround",
    borderRadius: 10,
    marginBottom: 10,
  },
  imageLogo: {
    height: 50,
    width: 50,
    // backgroundColor: "black",
    // display: "inline-block",
  },
  textInput: {
    height: 50,
    width: 700,
    marginRight: 20,
    borderRadius: 13,
  },
  wrapperInput: {
    display: "inline-block",
    paddingLeft: 0,
  },
  wrapperuser: {
    backgroundColor: "blue",
  },
  btnSearch: {
    height: 50,
    width: 100,
    borderRadius: 13,
  },
  imageLogoSearch: {
    height: 30,
    width: 30,
  },
  imageLogoUser: {
    height: 40,
    width: 40,
  },
};
export default index;
