import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddFolder.scss";
import checkPassWord from "../../../../RestAPI/Folder/CheckPassWord.js";
import GetFolderAndFileFromFolder from "../../../../RestAPI/Folder/GetFolderAndFileFromFolder.js";
import { connect } from "react-redux";
import addFolder from "../../../../RestAPI/Folder/addFolder";
AddFolder.propTypes = {
  handleCloseAddFolder: PropTypes.func,
};
AddFolder.Authenication = {
  handleCloseAddFolder: null,
};

function AddFolder(props) {
  const { handleCloseAddFolder } = props;
  const [NameFolder, setNameFolder] = useState("");
  const [PasswordFolder, setPasswordFolder] = useState("");
  const [checked, setChecked] = React.useState(true);
  const HandleClose = () => {
    handleCloseAddFolder();
  };
  function handleTextNameFolder(e) {
    setNameFolder(e.target.value);
  }
  function handleTextPassWordFolder(e) {
    setPasswordFolder(e.target.value);
  }
  const HandleBtnSubmit = () => {
    alert(NameFolder + "/" + PasswordFolder + "/" + checked);
    if (checked === true) {
      setPasswordFolder("");
    }

    var level = props.levelFolder + 1;
    var IDFolderAdd = null;
    if (props.IDFolder === 1999999999) {
      IDFolderAdd = null;
    } else {
      IDFolderAdd = props.IDFolder;
    }

    addFolder(
      NameFolder,
      setPasswordFolder,
      checked,
      props.IDRoom,
      props.DataUser.token,
      level,
      IDFolderAdd
    )
      .then((json) => {
        var data = JSON.parse(JSON.stringify(json));
        console.log(data);
        if (data.dataString === "THANH_CONG") {
          alert("THANH_CONG");
        } else {
          alert("Login fail");
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  return (
    <div className="wrapperAddFolder" style={styles.wrapperAddFolder}>
      <div className="wrapperLeft">
      </div>
      <div className="wrapperRight">
        <div className="wrapperHeader">
          <h2>Add Folder</h2>
          <button onClick={() => HandleClose()}></button>
        </div>
        <div className="wrapperMain ">
          <div className="WrapperOneForm">
            <div className="WrapperDivName">
              <label>Folder Name:</label>
            </div>
            <div className="WrapperFormWrapperCheck">
              <input
                className="formTextInput"
                type="text"
                name="name"
                onChange={handleTextNameFolder}
                value={NameFolder}
              />
              <div className="WrapperCheck">
                <div className="WrapperCheck"> </div>
              </div>
            </div>
            <div className="WrapperDivName">
              <label>Folder Password:</label>
            </div>

            <div className="WrapperFormWrapperCheck">
              <input
                className="formTextInput"
                type="text"
                name="name"
                disabled={checked}
                onChange={handleTextPassWordFolder}
                value={PasswordFolder}
              />
              <div className="WrapperCheck">
                <input
                  className="wrapperCheck"
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              </div>
            </div>

            <div >
              <div
                className="btnSubmit"
                onClick={() => {
                  HandleBtnSubmit();
                }}
              >
                Submit
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  wrapperAddFolder: {
    height: "100%",
    width: "100%",
  },
};
function mapStateToProps(state) {
  return {
    DataUser: state.DataUser,
    DataFolderRoom: state.DataFolderRoom,
    FileFromFolder: state.FileFromFolder,
    IDFolder: state.IDFolder,
    IDRoom: state.IDRoom,
    levelFolder: state.levelFolder,
    IDParent: state.IDParent,
  };
}
export default connect(mapStateToProps)(AddFolder);
