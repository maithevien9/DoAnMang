import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Document.scss";
import { Scrollbars } from "react-custom-scrollbars";
import Folder from "../../../public/image/folder2.png";
import GetFolderFromRoom from "../../../RestAPI/Folder/GetFolderFromRoom";
import GetFolderAndFileFromFolder from "../../../RestAPI/Folder/GetFolderAndFileFromFolder";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import HandleDownLoadFile from "./Download";
import Modal from "react-modal";
import CheckPassWork from "./CheckPassWork/index.jsx";
import SharedFolder from "./SharedFolder/index.jsx";
import ChangName from "../../../RestAPI/Folder/ChangeName";
import ChangePassWord from "../../../RestAPI/Folder/ChangePassWord";
import DeleteFolder from "../../../RestAPI/Folder/DeleteFolder";
import DeleteDoc from "../../../RestAPI/Document/DeleteDoc";
import SharedDocument from "./SharedDocument/index.jsx";
import MyDocument from "../../../RestAPI/User/MyDocument";
import Popover from "@material-ui/core/Popover";

Document.propTypes = {};

function Document(props) {
  const [DataDocument, setDataDocument] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  var dataArrayFolder = JSON.parse(JSON.stringify(props.DataFolderRoom));
  const [valueDocument, setValueDocument] = useState(true);
  const [tempValue, setTempValue] = useState("");
  const [valueName, setvalueName] = useState("");
  const [valuePassWord, setValuePassWord] = useState("");
  const [CheckChangeName, setCheckChangeName] = useState(true);
  const [CheckChangePass, setCheckChangePass] = useState(true);
  const [CheckDelete, setCheckDelete] = useState(true);
  const [CheckShare, setCheckShare] = useState(true);
  const [IDFolderValue, setIDFolderValue] = useState(0);
  const [IDDocValue, setIDDocValue] = useState(0);

  var DataFolderRoom = [];
  var tempBack = 0;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [modalIsOpen3, setModalIsOpen3] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
    setAnchorEl4(null);
  };
  useEffect(() => {
    // setDataRoom(["2", "3"]);
    // console.log("??");
    // console.log(dataRoom);
    // GetFolderFromRoom(101)
    //   .then((json) => {
    //     DataFolderRoom = JSON.parse(JSON.stringify(json));
    //     console.log(DataFolderRoom);
    //     if (DataFolderRoom.dataString === "THANH_CONG") {
    //       // if (handleLogin) {
    //       //   handleLogin();
    //       //   SaveDataLogin(DataLoginUser);
    //       // }
    //     } else {
    //       alert("NetWork fail");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error + "fail");
    //   });
  }, []);

  const HandleGetFolderFromRoom = () => {
    props.dispatch({
      type: "ResetLevel",
    });
    props.dispatch({
      type: "ResetIDFolder",
    });
    props.dispatch({
      type: "Reset",
    });
    console.log("Reset");
    props.dispatch({
      type: "SetDataFolder",
      data: props.DataFolderTemp,
    });

    props.dispatch({
      type: "SetDataFile",
      dataFile: props.DataFileTemp,
    });
    // if (props.IDRoom === 1) {
    //   props.dispatch({
    //     type: "SetDataFolder",
    //     data: props.DataFolderTemp,
    //   });

    //   props.dispatch({
    //     type: "SetDataFile",
    //     dataFile: props.DataFileTemp,
    //   });
    // } else {
    //   GetFolderFromRoom(props.IDRoom)
    //     .then((json) => {
    //       DataFolderRoom = JSON.parse(JSON.stringify(json));

    //       props.dispatch({
    //         type: "SetDataFolder",
    //         data: DataFolderRoom.data,
    //       });
    //       props.dispatch({
    //         type: "SetDataFile",
    //         dataFile: [],
    //       });
    //     })
    //     .catch((error) => {
    //       console.error(error + "fail");
    //     });
    // }
  };
  const handleClickFolder = (value, isPassWord, level) => {
    if (isPassWord === 1) {
      props.dispatch({
        type: "SetBackAdd",
        data: value,
      });
      props.dispatch({
        type: "SetIDFolder",
        ID: value,
      });
      props.dispatch({
        type: "setLevel",
        data: level,
      });
      setModalIsOpen(true);
    }
    if (isPassWord === 0) {
      props.dispatch({
        type: "SetBackAdd",
        data: value,
      });
      props.dispatch({
        type: "SetIDFolder",
        ID: value,
      });
      props.dispatch({
        type: "setLevel",
        data: level,
      });
      GetFolderAndFileFromFolder(value)
        .then((json) => {
          var DataFileFolder = JSON.parse(JSON.stringify(json));
          console.log(DataFileFolder.data);
          console.log(DataFileFolder.file);

          props.dispatch({
            type: "SetDataFolder",
            data: DataFileFolder.data,
          });

          props.dispatch({
            type: "SetDataFile",
            dataFile: DataFileFolder.file,
          });
        })
        .catch((error) => {
          console.error(error + "fail");
        });
    }

    // props.dispatch({
    //     type: "SetDataFolder",
    //     data: DataFolderRoom.data,
    //   });
  };
  const HandleBack = (value) => {
    alert(value[0].id);
    props.dispatch({
      type: "Setback",
      IDFolder: value[0].id,
    });
    if (value.length >= 2) {
      if (value[1].id != "temp") {
        console.log(props.DataBack[1].id);
        GetFolderAndFileFromFolder(props.DataBack[1].id)
          .then((json) => {
            var DataFileFolder = JSON.parse(JSON.stringify(json));
            console.log(DataFileFolder.data);
            console.log(DataFileFolder.file);

            props.dispatch({
              type: "SetDataFolder",
              data: DataFileFolder.data,
            });

            props.dispatch({
              type: "SetDataFile",
              dataFile: DataFileFolder.file,
            });
          })
          .catch((error) => {
            console.error(error + "fail");
          });
      } else {
        HandleGetFolderFromRoom();
      }
    }
  };
  const handleRightClickFolder = (value, IDFolder) => {
    setIDFolderValue(IDFolder);
    if (value === props.DataUser.data[0].ID) {
      setAnchorEl(true);
    }
  };
  const handleRightClickFile = (value, value2) => {
    setIDDocValue(value2);
    if (value === props.DataUser.data[0].ID) {
      setAnchorEl2(true);
    }
  };
  const HandleDownload = (value) => {
    alert(value);
  };
  const HandleChangeName = (value) => {
    // alert(value);
    setAnchorEl3(true);
    setAnchorEl(null);
  };
  const HandleChangePassWord = (value) => {
    // alert(value);
    setAnchorEl3(true);
    setAnchorEl(null);
  };
  function handleTextNameFolder(e) {
    setvalueName(e.target.value);
  }
  function handleTextPassWord(e) {
    setValuePassWord(e.target.value);
  }
  const HandleChangeNameSend = (IDfolder) => {
    // alert(IDFolderValue);
    console.log(IDFolderValue + "/" + valueName + "/" + props.DataUser.token);
    ChangName(IDFolderValue, valueName, props.DataUser.token)
      .then((json) => {
        var dataCheck = JSON.parse(JSON.stringify(json));
        console.log(dataCheck.dataString);
        if (dataCheck.dataString === "THANH_CONG") {
          props.dispatch({
            type: "ChangNameFolder",
            Name: valueName,
            IDfolder: IDFolderValue,
          });
          alert("Success");
          handleClose();
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const handleCloseCheckPass = () => {
    setModalIsOpen(false);
  };
  const handleCloseSharedFolder = () => {
    setModalIsOpen2(false);
  };
  const handleCloseSharedDocument = () => {
    setModalIsOpen3(false);
  };
  const HandleSendChangPass = () => {
    alert(valuePassWord);

    ChangePassWord(IDFolderValue, valuePassWord, props.DataUser.token)
      .then((json) => {
        var dataCheck = JSON.parse(JSON.stringify(json));
        console.log(dataCheck.dataString);
        if (dataCheck.dataString === "THANH_CONG") {
          handleClose();
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const handleClickChangPass = () => {
    setAnchorEl4(true);
    setAnchorEl(null);
  };
  const handleDeletefolder = () => {
    DeleteFolder(IDFolderValue, props.DataUser.token)
      .then((json) => {
        var dataCheck = JSON.parse(JSON.stringify(json));
        console.log(dataCheck.dataString);
        if (dataCheck.dataString === "THANH_CONG") {
          props.dispatch({
            type: "DeleteFolder",
            IDfolder: IDFolderValue,
          });
          alert("Success");
          handleClose();
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const HandleDeleteDoc = (value) => {
    console.log(IDDocValue);
    DeleteDoc(IDDocValue, props.DataUser.token)
      .then((json) => {
        var dataCheck = JSON.parse(JSON.stringify(json));
        console.log(dataCheck.dataString);
        if (dataCheck.dataString === "THANH_CONG") {
          props.dispatch({
            type: "DeleteFile",
            IDfile: IDDocValue,
          });
          alert("Success");
          // GetFolderAndFileFromFolder(props.IDFolder)
          //   .then((json) => {
          //     var DataFileFolder = JSON.parse(JSON.stringify(json));
          //     console.log(DataFileFolder.data);
          //     console.log(DataFileFolder.file);

          //     props.dispatch({
          //       type: "SetDataFolder",
          //       data: DataFileFolder.data,
          //     });

          //     props.dispatch({
          //       type: "SetDataFile",
          //       dataFile: DataFileFolder.file,
          //     });
          //   })
          //   .catch((error) => {
          //     console.error(error + "fail");
          //   });
          handleClose();
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const HandleClickSharedFolder = () => {
    handleClose();
    setModalIsOpen2(true);
    props.dispatch({
      type: "ResestDataUser",
    });
  };
  const HandleClickSharedDocument = () => {
    handleClose();
    setModalIsOpen3(true);
    props.dispatch({
      type: "ResestDataUser",
    });
  };
  //
  return (
    <div className="wrp" style={styles.wrapperDocument}>
      <button onClick={() => HandleBack(props.DataBack)}></button>
      <div className="wrapperRooms">
        <div className="wrapperHeader">
          <div className="wrapperNameFolder">
            <p>Name</p>
          </div>
          <div className="wrapperdiv">By User</div>
          <div className="wrapperOwner">
            <p>By ID</p>
          </div>
          <div className="wrapperTime">
            <p> Last Modified</p>
          </div>
        </div>

        {props.DataFolderRoom.map((e) => (
          <div
            className="wrapperFolder"
            key={e.ID}
            onDoubleClick={() => handleClickFolder(e.ID, e.isPassWord, e.level)}
            onContextMenu={() => handleRightClickFolder(e.IDuser, e.ID)}
          >
            <div className="wrapperNameFolder">
              <img className="wrapperImage" src={Folder} alt="user" />
              <p>{e.Name}</p>
            </div>
            <div className="wrapperMenu">
              <Popover
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 120, left: 400 }}
                anchorOrigin={{
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => HandleChangeName(e.ID)}>
                  <div className="styleMenuItem">Change Name</div>
                </MenuItem>
                <MenuItem onClick={() => handleClickChangPass(e.ID)}>
                  <div className="styleMenuItem">Change Password</div>
                </MenuItem>
                <MenuItem onClick={() => HandleClickSharedFolder()}>
                  <div className="styleMenuItem">Share</div>
                </MenuItem>
                <MenuItem onClick={() => handleDeletefolder()}>
                  <div className="styleMenuItem">Delete</div>
                </MenuItem>
              </Popover>
              <Popover
                id="simple-menu"
                anchorEl={anchorEl3}
                keepMounted
                open={Boolean(anchorEl3)}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 120, left: 400 }}
                anchorOrigin={{
                  horizontal: "right",
                }}
              >
                <MenuItem style={{ height: 50, width: 350 }}>
                  <input
                    style={{ fontSize: 26, marginRight: 10 }}
                    type="text"
                    onChange={handleTextNameFolder}
                    value={valueName}
                  />
                </MenuItem>
                <MenuItem
                  style={{ height: 50, width: 350 }}
                  onClick={() => HandleChangeNameSend(e.ID)}
                >
                  <div className="styleMenuItem">Change Name Folder</div>
                </MenuItem>
              </Popover>
              <Popover
                id="simple-menu"
                anchorEl={anchorEl4}
                keepMounted
                open={Boolean(anchorEl4)}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 120, left: 400 }}
                anchorOrigin={{
                  horizontal: "right",
                }}
              >
                <MenuItem style={{ height: 50, width: 350 }}>
                  <input
                    style={{ fontSize: 26, marginRight: 10 }}
                    type="text"
                    onChange={handleTextPassWord}
                    value={valuePassWord}
                  />
                </MenuItem>
                <MenuItem
                  style={{ height: 50, width: 350 }}
                  onClick={() => HandleSendChangPass()}
                >
                  <div className="styleMenuItem">Change Password</div>
                </MenuItem>
              </Popover>
            </div>
            <div className="wrapperdiv">{e.name}</div>
            <div className="wrapperOwner">
              <p>{e.IDuser}</p>
            </div>
            <div className="wrapperTime">
              <p>{e.SendTime}</p>
            </div>
          </div>
        ))}

        <div className="wrapperHeaderFile"></div>

        {props.FileFromFolder.map((e) => (
          <div
            className="wrapperFile"
            key={e.ID}
            onContextMenu={() => handleRightClickFile(e.IDuser, e.ID)}
            onDoubleClick={() => {
              HandleDownLoadFile(e.ID);
            }}
          >
            <div className="wrapperNameFolder">
              <p>{e.Name}</p>
            </div>
            <div className="wrapperdiv">{e.name}</div>
            <Popover
              // id="simple-menu"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={handleClose}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 120, left: 400 }}
              anchorOrigin={{
                horizontal: "right",
              }}
            >
              <MenuItem
                style={{ height: 50, width: 150 }}
                onClick={() => HandleClickSharedDocument()}
              >
                <div className="styleMenuItem">Share</div>
              </MenuItem>
              <MenuItem
                style={{ height: 50, width: 150 }}
                onClick={() => HandleDeleteDoc(e.ID)}
              >
                <div className="styleMenuItem">Delete</div>
              </MenuItem>
            </Popover>
            <div className="wrapperOwner">
              <p>{e.IDuser}</p>
            </div>
            <div className="wrapperTime">
              <p>{e.SendTime}</p>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={modalIsOpen} className="Modal">
        <CheckPassWork handleCloseCheckPass={handleCloseCheckPass} />
      </Modal>
      <Modal isOpen={modalIsOpen2} className="Modal2">
        <SharedFolder
          handleCloseSharedFolder={handleCloseSharedFolder}
          IDFolderValue={IDFolderValue}
        />
      </Modal>
      <Modal isOpen={modalIsOpen3} className="Modal2">
        <SharedDocument
          handleCloseSharedDocument={handleCloseSharedDocument}
          IDDocValue={IDDocValue}
        />
      </Modal>
    </div>
  );
}
var styles = {
  wrapperDocument: {
    width: 1700,
    height: 950,
    backgroundColor: "#E9E9E9",
    borderRadius: 20,
    marginLeft: 10,
  },
};
function mapStateToProps(state) {
  return {
    DataUser: state.DataUser,
    DataFolderRoom: state.DataFolderRoom,
    FileFromFolder: state.FileFromFolder,
    DataBack: state.DataBack,
    IDRoom: state.IDRoom,
    IDFolder: state.IDFolder,
    DataFolderTemp: state.DataFolderTemp,
    DataFileTemp: state.DataFileTemp,
  };
}
export default connect(mapStateToProps)(Document);
