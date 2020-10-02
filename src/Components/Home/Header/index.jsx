import React, { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../../../public/image/Logo.png";

import User from "../../../public/image/user2.png";
import User2 from "../../../public/image/userr.png";
import Moreimg from "../../../public/image/folder2.png";
// import Menu, { SubMenu, MenuItem } from "rc-menu";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import { connect } from "react-redux";
import { BottomNavigation } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import GetFolderAndFileFromFolder from "../../../RestAPI/Folder/GetFolderAndFileFromFolder";

import SaveDataLogin from "../../../LocalStorage/SaveDataLogin.js";
import Popover from "@material-ui/core/Popover";
import "./Header.scss";
import ShareWithMe from "../../../RestAPI/Folder/ShareWithMe.js";
import MyDocument from "../../../RestAPI/User/MyDocument.js";

Header.propTypes = {
  handleLogOut2: PropTypes.func,
};
Header.Authenication = {
  handleLogOut2: null,
};
const options = ["None", "Atria", "Callisto", "Dione"];
function Header(props) {
  const [valueUser, setValueUser] = useState(true);
  const { handleLogOut2 } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);

  const handleClick2 = (event2) => {
    setAnchorE2(event2.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
  };

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
  const HandleShareWithMe = () => {
    ShareWithMe(props.DataUser.token)
      .then((json) => {
        var dataCheck = JSON.parse(JSON.stringify(json));
        console.log(json);
        if (dataCheck.dataString === "THANH_CONG") {
          props.dispatch({
            type: "Reset",
          });

          props.dispatch({
            type: "SetDataFolder",
            data: dataCheck.data,
          });

          props.dispatch({
            type: "SetDataFile",
            dataFile: dataCheck.data2,
          });
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const HandleMyDoc = () => {
    MyDocument(props.DataUser.token)
      .then((json) => {
        var dataCheck = JSON.parse(JSON.stringify(json));
        console.log(json);
        if (dataCheck.dataString === "THANH_CONG") {
          props.dispatch({
            type: "Reset",
          });

          props.dispatch({
            type: "SetDataFolder",
            data: dataCheck.data,
          });

          props.dispatch({
            type: "SetDataFile",
            dataFile: dataCheck.data2,
          });
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };

  return (
    <div style={styles.wrapper} class="wrapper">
      <div class="home">
        <img style={styles.imageLogo} src={Logo} alt="Logo" class="image" />
      </div>

      <div class="search" style={styles.wrapperInput}>
        <input
          style={styles.textInput}
          class="textInput"
          type="text"
          placeholder="Search..."
        ></input>
      </div>

      <div class="btn">
        <div class="btnMore">
          <IconButton
            aria-controls="simple-menu2"
            aria-haspopup="true"
            onClick={handleClick2}
          >
            <div style={{ height: 50, width: 50 }}>
              <img style={styles.imageMore} src={Moreimg} alt="more" />
            </div>
          </IconButton>

          <Popover
            id="simple-menu2"
            open={Boolean(anchorE2)}
            anchorE2={anchorE2}
            onClose={handleClose2}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 100, left: 1500 }}
            anchorOrigin={{
              horizontal: "right",
            }}
          >
            <MenuItem onClick={HandleMyDoc}>My Document</MenuItem>
            <MenuItem
              onClick={() => {
                HandleShareWithMe();
              }}
            >
              Shared With Me
            </MenuItem>
            <MenuItem>Provide Manager Rights</MenuItem>
            <MenuItem>Document Manager</MenuItem>
          </Popover>
        </div>

        <div class="btnUser">
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <div
              onMouseMove={handleEvent1}
              onMouseLeave={handleEvent2}
              style={{ height: 50, width: 50 }}
            >
              <img
                style={styles.imageLogoUser}
                src={valueUser ? User : User2}
                alt="user"
              />
            </div>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogOutHeader}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
var styles = {
  wrapper: {
    height: 100,
    width: "100%",
    display: "flex",
    borderRadius: 10,
    marginBottom: 10,
  },
  imageLogo: {
    height: 70,
    width: 70,

    // backgroundColor: "black",
    // display: "inline-block",
  },

  textInput: {
    height: 50,
    width: 500,
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
  imageLogoUser: {
    height: 50,
    width: 50,
  },
  imageMore: {
    height: 50,
    width: 50,
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
export default connect(mapStateToProps)(Header);
