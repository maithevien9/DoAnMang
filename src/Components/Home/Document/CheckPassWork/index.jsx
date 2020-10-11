import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CheckPassWork.scss";
import checkPassWord from "../../../../RestAPI/Folder/CheckPassWord.js";
import GetFolderAndFileFromFolder from "../../../../RestAPI/Folder/GetFolderAndFileFromFolder.js";
import { connect } from "react-redux";
CheckPassWork.propTypes = {
  handleCloseCheckPass: PropTypes.func,
};
CheckPassWork.Authenication = {
  handleCloseCheckPass: null,
};

function CheckPassWork(props) {
  const { handleCloseCheckPass } = props;
  const [passwordFolder, setPasswordFolder] = useState("");
  const HandleClose = () => {
    handleCloseCheckPass();
  };
  function handleTextPassWord(e) {
    setPasswordFolder(e.target.value);
  }
  const handleCheck = () => {
    alert(passwordFolder);
    checkPassWord(props.IDFolder, passwordFolder)
      .then((json) => {
        var Data = JSON.parse(JSON.stringify(json));

        if (Data.dataString === "THANH_CONG") {
          GetFolderAndFileFromFolder(props.IDFolder)
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
              handleCloseCheckPass();
            })
            .catch((error) => {
              console.error(error + "fail");
            });
        } else {
          alert("fail");
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  return (
    <div className="wrapperForm">
      <div onClick={HandleClose} className="wrapperClose">
        Close
      </div>
      <div className="wrapperMain" style={{ marginBottom: 20, marginTop: 50 }}>
        Check PassWord
      </div>
      <div className="wrapperMain">
        <input
          className="formText"
          type="text"
          name="name"
          onChange={handleTextPassWord}
          value={passwordFolder}
        />
      </div>
      <div
        className="wrapperMain2"
        style={{ marginTop: 80 }}
        onClick={handleCheck}
      >
        <div className="wrapperBtn"> Submit</div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    DataUser: state.DataUser,
    DataFolderRoom: state.DataFolderRoom,
    FileFromFolder: state.FileFromFolder,
    IDFolder: state.IDFolder,
    IDRoom: state.IDRoom,
  };
}
export default connect(mapStateToProps)(CheckPassWork);
