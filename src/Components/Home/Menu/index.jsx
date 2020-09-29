import React, { useState } from "react";
import styled from "styled-components";
import Folder from "../../../public/image/folder2.png";
import File2 from "../../../public/image/folder2.png";
import "./Menu.scss";
import { connect } from "react-redux";
import GetFolderFromRoom from "../../../RestAPI/Folder/GetFolderFromRoom.js";
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
  return (
    <div className="App">
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
  };
}
export default connect(mapStateToProps)(TreeView);
