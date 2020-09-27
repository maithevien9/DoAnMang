import React, { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../../../public/image/Logo.png";
import Icon from "./Header.scss";
import Search from "../../../public/image/search.png";
import User from "../../../public/image/user2.png";
import User2 from "../../../public/image/userr.png";
// import Menu, { SubMenu, MenuItem } from "rc-menu";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SaveDataLogin from "../../../LocalStorage/SaveDataLogin.js";

Header.propTypes = {
  handleLogOut2: PropTypes.func,
};
Header.Authenication = {
  handleLogOut2: null,
};

function Header(props) {
  const [valueUser, setValueUser] = useState(true);
  const [height, setHeight] = useState(40);
  const { handleLogOut2 } = props;
  const [width, setWidth] = useState(40);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEvent1 = () => {
    setValueUser(false);
  };
  const handleEvent2 = () => {
    setValueUser(true);
  };
  const handleLogOutHeader = () => {
    if (handleLogOut2) {
      handleLogOut2();
      SaveDataLogin({
        dataString: "KHONG_THANH_CONG",
      });
    }
  };

  return (
    <div style={styles.wrapper} className="wrapper">
      <img style={styles.imageLogo} src={Logo} alt="Logo" />
      <div style={styles.wrapperInput}>
        <input
          style={styles.textInput}
          className="textInput"
          type="text"
        ></input>
      </div>

      <img
        className="imageSearch"
        style={styles.imageLogoSearch}
        src={Search}
        alt="Logo"
      />

      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <div
            onMouseMove={handleEvent1}
            onMouseLeave={handleEvent2}
            style={{ height: height, width: width }}
          >
            <img
              className=""
              style={styles.imageLogoUser}
              src={valueUser ? User : User2}
              alt="user"
            />
          </div>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My Document</MenuItem>
          <MenuItem onClick={handleClose}>Share With Me</MenuItem>
          <MenuItem onClick={handleLogOutHeader}>Log Out</MenuItem>
        </Menu>
      </div>
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
    height: 50,
    width: 50,
  },
};
export default Header;
