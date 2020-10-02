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

function TreeView(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [fileUp, setfileUp] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const HandleClickRoom = (value) => {
    props.dispatch({
      type: "Reset",
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
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const HandleAdd = () => {
    setAnchorEl(true);
  };
  const HandleAdd2 = () => {
    setAnchorEl2(true);
  };
  const HandleAddFile = () => {
    if (props.IDFolder !== 1999999999 && fileUp != null) {
      var data = new FormData();
      data.append("photo", fileUp);
      data.append("Token", props.DataUser.token);
      data.append("IDFolder", props.IDFolder);
      Upload(data)
        .then((json) => {
          var dataCheck = JSON.parse(JSON.stringify(json));
          console.log(dataCheck.success);
          if (dataCheck.success === "THANH_CONG") {
            alert("THANH_CONG");
            console.log(fileUp.name);
            console.log(props.DataUser.data[0].ID);
            // let ts = Date.now();

            // let date_ob = new Date(ts);
            // let date = date_ob.getDate();
            // let month = date_ob.getMonth() + 1;
            // let year = date_ob.getFullYear();

            // var hour = date_ob.getHours();
            // var min = date_ob.getMinutes();
            // var sec = date_ob.getSeconds();

            // console.log(
            //   year +
            //     "-" +
            //     month +
            //     "-" +
            //     date +
            //     " " +
            //     hour +
            //     ":" +
            //     min +
            //     ":" +
            //     sec
            // );
            // var time =
            //   year +
            //   "-" +
            //   month +
            //   "-" +
            //   date +
            //   " " +
            //   hour +
            //   ":" +
            //   min +
            //   ":" +
            //   sec;
            // props.dispatch({
            //   type: "AddFile",
            //   Name: fileUp.name,
            //   ID: props.DataUser.data[0].ID,
            //   SendTime: time,
            // });
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
  return (
    <div className="App">
      <div className="wrapperAdd" onClick={() => HandleAdd()}>
        ADD
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Add Folder</MenuItem>
        <MenuItem onClick={() => HandleAdd2()}>File Upload File</MenuItem>
        {/* <MenuItem onClick={() => HandleAddFile()}>Add File</MenuItem> */}
      </Menu>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
      >
        <MenuItem>
          <input
            style={{ marginRight: 10 }}
            type="file"
            onChange={(e) => {
              HandleUpload(e);
            }}
          />
        </MenuItem>
        <MenuItem onClick={() => HandleAddFile()}>Send</MenuItem>
        {/* <MenuItem onClick={() => HandleAddFile()}>Add File</MenuItem> */}
      </Menu>
      <h1>ROOMS</h1>
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
          <Tree.File name="Room201" onClick={() => {}} />
          <Tree.File name="Room202" onClick={() => {}} />
          <Tree.File name="Room203" onClick={() => {}} />
          <Tree.File name="Room204" onClick={() => {}} />
        </Tree.Folder>
        <Tree.Folder name="Floor 3">
          <Tree.File name="Room301" />
          <Tree.File name="Room302" />
          <Tree.File name="Room303" />
          <Tree.File name="Room304" />
        </Tree.Folder>
        <Tree.Folder name="Floor 4">
          <Tree.File name="Room401" />
          <Tree.File name="Room402" />
          <Tree.File name="Room403" />
          <Tree.File name="Room404" />
        </Tree.Folder>
        <Tree.Folder name="Floor 5">
          <Tree.File name="Room501" />
          <Tree.File name="Room502" />
          <Tree.File name="Room503" />
          <Tree.File name="Room504" />
        </Tree.Folder>
        <Tree.Folder name="Floor 6">
          <Tree.File name="Room601" />
          <Tree.File name="Room602" />
          <Tree.File name="Room603" />
          <Tree.File name="Room604" />
        </Tree.Folder>
        <Tree.Folder name="Floor 7">
          <Tree.File name="Room701" />
          <Tree.File name="Room702" />
          <Tree.File name="Room703" />
          <Tree.File name="Room704" />
        </Tree.Folder>
      </Tree>
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
