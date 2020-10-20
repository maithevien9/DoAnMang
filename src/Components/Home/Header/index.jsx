import React, { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../../../public/image/Logo.png";
import a from "../../../public/image/a.jpg";
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
import DocumentManage from "../../../RestAPI/Admin/DocumentManage.js";
import GetUser from "../../../RestAPI/Admin/GetUser.js";
import UpdateForm from "./ChangInfor/index";
import Modal from "react-modal";
import SearchAPI from "../../../RestAPI/Document/SearchAPI.js";

Header.propTypes = {
  handleLogOut2: PropTypes.func,
  HandleProvide: PropTypes.func,
  HandleProvide2: PropTypes.func,
};
Header.Authenication = {
  handleLogOut2: null,
  HandleProvide: null,
  HandleProvide2: null,
};
const options = ["None", "Atria", "Callisto", "Dione"];
function Header(props) {
  const [valueUser, setValueUser] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    handleLogOut2,
    HandleProvide,
    HandleProvide2,
    ValueCheckAdmin,
  } = props;
  var temp1 = false;
  var temp2 = true;
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [valueSearch, setValueSearch] = useState("");

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
        data: [],
        token: "",
      });
    }
  };
  const handleProvideOpen = () => {
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
    if (HandleProvide) {
      HandleProvide();
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

          //temp
          props.dispatch({
            type: "DataFolderTemp",
            data: dataCheck.data,
          });
          props.dispatch({
            type: "DataFileTemp",
            data: dataCheck.data2,
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
          //temp
          props.dispatch({
            type: "DataFolderTemp",
            data: dataCheck.data,
          });
          props.dispatch({
            type: "DataFileTemp",
            data: dataCheck.data2,
          });
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const HandleDocumentManagement = () => {
    DocumentManage()
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
            dataFile: [],
          });

          //temp
          props.dispatch({
            type: "DataFolderTemp",
            data: dataCheck.data,
          });
          props.dispatch({
            type: "DataFileTemp",
            data: [],
          });
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const HandleRegister = () => {
    if (HandleProvide2) {
      HandleProvide2();
    }
  };
  const handleCloseFormInfor = () => {
    setModalIsOpen(false);
  };
  const HandleProfile = () => {
    setModalIsOpen(true);
  };

  function handleTextSearch(e) {
    setValueSearch(e.target.value);
  }
  const handleSearch = () => {};
  function keyPressed(event) {
    if (event.key === "Enter") {
      SearchAPI(valueSearch)
        .then((json) => {
          var dataCheck = JSON.parse(JSON.stringify(json));
          console.log(dataCheck.file);
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
              dataFile: dataCheck.file,
            });
            //temp
            props.dispatch({
              type: "DataFolderTemp",
              data: dataCheck.data,
            });
            props.dispatch({
              type: "DataFileTemp",
              data: dataCheck.file,
            });
          }
        })
        .catch((error) => {
          console.error(error + "fail");
        });
    }
  }

  function handleTextSearch(e) {
    setValueSearch(e.target.value);
  }
  const handleReset = () => {
    alert("Reset");
    props.dispatch({
      type: "SetDataFolder",
      data: [],
    });

    props.dispatch({
      type: "SetDataFile",
      dataFile: [],
    });
  };
  return (
    <div style={styles.wrapper} class="wrapper">
      <div
        class="home"
        style={{ marginLeft: 70 }}
        onClick={() => {
          handleReset();
        }}
      >
        <img style={styles.imageLogo} src={Logo} alt="Logo" class="image" />
      </div>

      <div class="search" style={styles.wrapperInput}>
        <input
          style={styles.textInput}
          class="textInput"
          type="text"
          placeholder="Search..."
          onChange={handleTextSearch}
          value={valueSearch}
          onKeyPress={keyPressed}
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
            anchorPosition={{ top: 100, left: 2000 }}
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
            <MenuItem
              onClick={handleProvideOpen}
              disabled={props.ValueCheckManager}
            >
              Provide Manager Rights
            </MenuItem>
            <MenuItem
              disabled={props.ValueCheckAdmin}
              onClick={() => HandleDocumentManagement()}
            >
              Document Management
            </MenuItem>
            <MenuItem
              disabled={props.ValueCheckAdmin}
              onClick={() => HandleRegister()}
            >
              Register
            </MenuItem>
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
            <MenuItem
              style={{ height: 50 }}
              onClick={() => {
                console.log(props.DataInforUser[0]);
              }}
            >
              <div className="wrapperFormInfor">
                <p>User Information: </p>
                <p>{props.DataInforUser[0].Name}</p>
              </div>
            </MenuItem>
            <MenuItem onClick={HandleProfile}>
              <div className="styleMenuItem">Update User Information</div>
            </MenuItem>
            <MenuItem onClick={handleLogOutHeader}>
              <div className="styleMenuItem">Logout</div>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} className="Modal">
        <UpdateForm
          handleCloseFormInfor={handleCloseFormInfor}
          // IDDocValue={IDDocValue}
        />
      </Modal>
    </div>
  );
}
var styles = {
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    borderRadius: 10,
    marginBottom: 10,
    backgroundImage: `url(${a})`,
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
    ValueCheckAdmin: state.ValueCheckAdmin,
    ValueCheckManager: state.ValueCheckManager,
    DataInforUser: state.DataInforUser,
  };
}
export default connect(mapStateToProps)(Header);
