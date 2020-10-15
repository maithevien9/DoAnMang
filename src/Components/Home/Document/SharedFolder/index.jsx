import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SharedFolder.scss";
import checkPassWord from "../../../../RestAPI/Folder/CheckPassWord.js";
import GetFolderAndFileFromFolder from "../../../../RestAPI/Folder/GetFolderAndFileFromFolder.js";
import SearchUser from "../../../../RestAPI/User/SearchUser.js";
import { connect } from "react-redux";
import sharedFolder from "../../../../RestAPI/Folder/sharedFolder.js";

SharedFolder.propTypes = {
  handleCloseSharedFolder: PropTypes.func,
  IDFolderValue: PropTypes.number,
};
SharedFolder.Authenication = {
  handleCloseSharedFolder: null,
};

function SharedFolder(props) {
  const { handleCloseSharedFolder, IDFolderValue } = props;
  const [UserName, setUserName] = useState("");
  const HandleClose = () => {
    handleCloseSharedFolder();
  };
  function handleTextPassWord(e) {
    setUserName(e.target.value);
  }
  const handleCheck = () => {
    SearchUser(UserName)
      .then((json) => {
        var dataCheck = JSON.parse(JSON.stringify(json));
        console.log(dataCheck);
        if (dataCheck.dataString === "THANH_CONG") {
          props.dispatch({
            type: "SetDataUserSearch",
            data: dataCheck.data,
          });
          console.log(props.DataUserSearch);
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const handleClickAdd = (IDUser) => {
    props.dispatch({
      type: "SetDataUserSearchPush",
      data: IDUser,
    });
    console.log(props.DataUserSearchPush);
  };
  const handleShare = () => {
    sharedFolder(IDFolderValue, props.DataUserSearchPush, props.DataUser.token)
      .then((json) => {
        var dataCheck = JSON.parse(JSON.stringify(json));
        console.log(dataCheck);
        if (dataCheck.dataString === "THANH_CONG") {
          props.dispatch({
            type: "ResestDataUser",
          });
          alert("Success");
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const HandleDeleteData = (ID) => {
    props.dispatch({
      type: "ResestDataUser",
    });
  };
  var test = [1, 2, 3];
  return (
    <div className="wrapperShare">
      <div className="wrapperHeader">
        <h2>Share Folder</h2>
        <button onClick={() => HandleClose()}></button>
      </div>
      <div className="wrapperMain">
        <div className="wrapperSearchUser">
          <input
            className="formText"
            type="text"
            name="name"
            onChange={handleTextPassWord}
            value={UserName}
          />
          <button className="btnSS" onClick={() => handleCheck()}>
            {" "}
            Search User
          </button>
          <button className="btnSS" onClick={() => handleShare()}>
            {" "}
            Share
          </button>
        </div>
        <div className="wrapperBody" style={{ display: "inline-block" }}>
          <div className="wrapperUserInfor">
            <div className="wrapperTop">
              <p>ID</p>
              <p>Name</p>
              <p>Room</p>
              <p></p>
            </div>
            {props.DataUserSearch.map((e) => (
              <div className="wrapperShow" key={e.ID}>
                <div className="wrapperid">
                  <p>{e.ID}</p>{" "}
                </div>
                <div className="wrappername">
                  <p>{e.Name}</p>{" "}
                </div>
                <div className="wrapperidroom">
                  <p>{e.IDRoom}</p>{" "}
                </div>
                <button onClick={() => handleClickAdd(e.ID)}>Add</button>
              </div>
            ))}
          </div>
          <div className="wrapperUserInfor2">
            {props.DataUserSearchPush.map((e) => (
              <div className="wrapperShow2" key={e}>
                <p>ID: {e}</p>
                <button onClick={() => HandleDeleteData(e)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
var styles = {
  wrapper: {
    height: 70,
    width: "100%",
    display: "flex",
  },
};
function mapStateToProps(state) {
  return {
    DataUser: state.DataUser,
    DataFolderRoom: state.DataFolderRoom,
    FileFromFolder: state.FileFromFolder,
    IDFolder: state.IDFolder,
    IDRoom: state.IDRoom,
    DataUserSearch: state.DataUserSearch,
    DataUserSearchPush: state.DataUserSearchPush,
  };
}
export default connect(mapStateToProps)(SharedFolder);
