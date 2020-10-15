import React, { useState } from "react";
import styled from "styled-components";
import Folder from "../../../public/image/folder2.png";
import File2 from "../../../public/image/folder2.png";
import "./Menu.scss";
import { connect } from "react-redux";
import GetFolderFromRoom from "../../../RestAPI/Folder/GetFolderFromRoom.js";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Upload from "../../../RestAPI/Document/Upload.js";
import GetFolderAndFileFromFolder from "../../../RestAPI/Folder/GetFolderAndFileFromFolder.js";
import AddFolder from "./AddFolder/index.js";
import Modal from "react-modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
const StyledTree = styled.div`
  line-height: 1.5;
`;
const StyledFile = styled.div`
  font-family: "Cochin";
  padding-left: 40px;
  display: flex;
  font-size: 30px;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;
const StyledFolder = styled.div`

font-family: "Cochin";
cursor: pointer;
    font-size:35px;
  padding-left: 40px;
  padding-top:10px
  padding-bottom: 10px;
  .folder--label {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
`;
const Collapsible = styled.div`
  height: ${(p) => (p.isOpen ? "0" : "auto")};
  overflow: hidden;
`;

const File = ({ name }) => {
  return (
    <StyledFile>
      {/* render the extension or fallback to generic file icon  */}
      <img src={File2} alt="folder" style={styles.imageFile} />
      <span>{name}</span>
    </StyledFile>
  );
};

const Folder2 = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <StyledFolder>
      <div className="folder--label" onClick={handleToggle}>
        <img src={Folder} alt="floor" style={styles.imageFolder} />
        <span>{name}</span>
      </div>
      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </StyledFolder>
  );
};

const Tree = ({ children }) => {
  return <StyledTree>{children}</StyledTree>;
};

Tree.File = File;
Tree.Folder = Folder2;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(2),
  },
  placeholder: {
    height: 40,
  },
}));
function TreeView(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [fileUp, setfileUp] = React.useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [state, setState] = useState("");
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("idle");
  const timerRef = React.useRef();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const HandleClickRoom = (value) => {
    props.dispatch({
      type: "ResetIDFolder",
    });
    props.dispatch({
      type: "Reset",
    });
    props.dispatch({
      type: "ResetLevel",
    });

    console.log("Reset");
    GetFolderFromRoom(value)
      .then((json) => {
        var DataFolderRoom = JSON.parse(JSON.stringify(json));

        props.dispatch({
          type: "SetDataFolder",
          data: DataFolderRoom.data,
        });
        props.dispatch({
          type: "SetDataFile",
          dataFile: [],
        });
        props.dispatch({
          type: "SetIDRoom",
          ID: value,
        });
        props.dispatch({
          type: "setLevel",
          data: 0,
        });

        //temp
        props.dispatch({
          type: "DataFolderTemp",
          data: DataFolderRoom.data,
        });
        props.dispatch({
          type: "DataFileTemp",
          data: [],
        });
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const HandleAdd = () => {
    if (props.IDRoom === 1) {
      alert("Please Click Folder or Room");
    } else {
      setAnchorEl(true);
    }
  };
  const HandleAdd2 = () => {
    if (props.IDFolder !== 1999999999) {
      setAnchorEl2(true);
    } else {
      alert("CLick into Folder");
    }
  };
  const HandleAddFile = () => {
    if (fileUp != null) {
      setLoading(true);
      var data = new FormData();
      data.append("photo", fileUp);
      data.append("Token", props.DataUser.token);
      data.append("IDFolder", props.IDFolder);
      Upload(data)
        .then((json) => {
          var dataCheck = JSON.parse(JSON.stringify(json));
          console.log(dataCheck.success);
          if (dataCheck.success === "THANH_CONG") {
            setLoading(false);
            alert("Success");
            console.log(fileUp.name);
            console.log(props.DataUser.data[0].ID);

            GetFolderAndFileFromFolder(props.IDFolder)
              .then((json) => {
                var DataFileFolder = json;
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
        })
        .catch((error) => {
          console.error(error + "fail");
        });
    }
  };
  const HandleUpload = (e) => {
    var fileUplooad = e.target.files;
    setfileUp(fileUplooad[0]);
  };
  const handleCloseAddFolder = () => {
    setModalIsOpen(false);
  };
  const HandleADDFolder = () => {
    setModalIsOpen(true);
  };
  const handleClickLoading = () => {
    setLoading(true);
  };
  return (
    <div className="App">
      <div className="wrapperAdd" onClick={() => HandleAdd()}>
        ADD
      </div>
      <Popover
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 220, left: 60 }}
        anchorOrigin={{
          horizontal: "right",
        }}
      >
        <MenuItem
          style={{ height: 50, fontSize: 26 }}
          onClick={() => HandleADDFolder()}
        >
          Add Folder
        </MenuItem>
        <MenuItem
          style={{ height: 50, fontSize: 26 }}
          onClick={() => HandleAdd2()}
        >
          File Upload File
        </MenuItem>
      </Popover>
      <Popover
        id="simple-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 220, left: 60 }}
        anchorOrigin={{
          horizontal: "right",
        }}
      >
        <MenuItem style={{ height: 70, width: 330 }}>
          <input
            style={{ fontSize: 22 }}
            type="file"
            onChange={(e) => {
              HandleUpload(e);
            }}
          />
        </MenuItem>

        <MenuItem style={{ height: 50, width: 330 }}>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? "800ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
          <Button
            onClick={HandleAddFile}
            style={{
              right: 0,
              fontSize: 35,
              width: "100%",
              fontFamily: "cochin",
            }}
          >
            {loading ? "Is Sending" : "Send"}
          </Button>
        </MenuItem>
        {/* <MenuItem onClick={() => HandleAddFile()}>Add File</MenuItem> */}
      </Popover>
      <h1></h1>
      <Tree>
        <Tree.Folder name="Floor 1">
          <div
            onClick={() => {
              HandleClickRoom(101);
            }}
          >
            <Tree.File name="Room 101" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(102);
            }}
          >
            <Tree.File name="Room 102" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(103);
            }}
          >
            <Tree.File name="Room 103" />
          </div>
          <div
            onClick={() => {
              HandleClickRoom(104);
            }}
          >
            <Tree.File name="Room 104" />
          </div>
        </Tree.Folder>
        <Tree.Folder name="Floor 2">
          <div
            onClick={() => {
              HandleClickRoom(201);
            }}
          >
            <Tree.File name="Room 201" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(202);
            }}
          >
            <Tree.File name="Room 202" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(203);
            }}
          >
            <Tree.File name="Room 203" />
          </div>
          <div
            onClick={() => {
              HandleClickRoom(204);
            }}
          >
            <Tree.File name="Room 204" />
          </div>
        </Tree.Folder>
        <Tree.Folder name="Floor 3">
          <div
            onClick={() => {
              HandleClickRoom(301);
            }}
          >
            <Tree.File name="Room 301" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(302);
            }}
          >
            <Tree.File name="Room 302" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(303);
            }}
          >
            <Tree.File name="Room 303" />
          </div>
          <div
            onClick={() => {
              HandleClickRoom(304);
            }}
          >
            <Tree.File name="Room 304" />
          </div>
        </Tree.Folder>
        <Tree.Folder name="Floor 4">
          <div
            onClick={() => {
              HandleClickRoom(401);
            }}
          >
            <Tree.File name="Room 401" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(402);
            }}
          >
            <Tree.File name="Room 402" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(403);
            }}
          >
            <Tree.File name="Room 403" />
          </div>
          <div
            onClick={() => {
              HandleClickRoom(404);
            }}
          >
            <Tree.File name="Room 404" />
          </div>
        </Tree.Folder>
        <Tree.Folder name="Floor 5">
          <div
            onClick={() => {
              HandleClickRoom(501);
            }}
          >
            <Tree.File name="Room 501" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(502);
            }}
          >
            <Tree.File name="Room 502" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(503);
            }}
          >
            <Tree.File name="Room 503" />
          </div>
          <div
            onClick={() => {
              HandleClickRoom(504);
            }}
          >
            <Tree.File name="Room 504" />
          </div>
        </Tree.Folder>
        <Tree.Folder name="Floor 6">
          <div
            onClick={() => {
              HandleClickRoom(601);
            }}
          >
            <Tree.File name="Room 601" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(602);
            }}
          >
            <Tree.File name="Room 602" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(603);
            }}
          >
            <Tree.File name="Room 603" />
          </div>
          <div
            onClick={() => {
              HandleClickRoom(604);
            }}
          >
            <Tree.File name="Room 604" />
          </div>
        </Tree.Folder>
        <Tree.Folder name="Floor 7">
          <div
            onClick={() => {
              HandleClickRoom(701);
            }}
          >
            <Tree.File name="Room 701" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(702);
            }}
          >
            <Tree.File name="Room 702" />
          </div>

          <div
            onClick={() => {
              HandleClickRoom(703);
            }}
          >
            <Tree.File name="Room 703" />
          </div>
          <div
            onClick={() => {
              HandleClickRoom(704);
            }}
          >
            <Tree.File name="Room 704" />
          </div>
        </Tree.Folder>
      </Tree>
      {/* <CircularProgress className="Circuler" state={state} /> */}

      <Modal isOpen={modalIsOpen} className="Modal">
        <AddFolder
          handleCloseAddFolder={handleCloseAddFolder}
          // IDDocValue={IDDocValue}
        />
      </Modal>
    </div>
  );
}
var styles = {
  imageFolder: {
    height: 30,
    width: 30,
  },
  imageFile: {
    height: 25,
    width: 25,
  },
};
function mapStateToProps(state) {
  return {
    IDRoom: state.IDRoom,
    IDFolder: state.IDFolder,
    DataUser: state.DataUser,
  };
}
export default connect(mapStateToProps)(TreeView);
