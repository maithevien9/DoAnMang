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
    alert(UserName);
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
    alert(IDUser);

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
    <div className="wrapperForm">
      <div onClick={HandleClose} className="wrapperClose">
        Close
      </div>
      <div className="wrapperMain" style={{ marginBottom: 20, marginTop: 10 }}>
        Share Folder
      </div>
      <div style={styles.wrapper} class="wrapperMain">
        <input
          className="formText"
          type="text"
          name="name"
          onChange={handleTextPassWord}
          value={UserName}
        />
        <div className="wrapperMain2" onClick={() => handleCheck()}>
          <div className="wrapperBtn"> Search User</div>
        </div>
        <div
          className="wrapperMain2"
          onClick={() => handleShare()}
          style={{ marginRight: 20 }}
        >
          <div className="wrapperBtn"> Share</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="wrapperUserInfor">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <p>ID</p>
            <p>Name</p>
            <p>Room</p>
            <p></p>
          </div>
          {props.DataUserSearch.map((e) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: 20,
                paddingRight: 20,
              }}
              key={e.ID}
            >
              <p>{e.ID}</p>
              <p>{e.Name}</p>
              <p>{e.IDRoom}</p>
              <p onClick={() => handleClickAdd(e.ID)}>Add</p>
            </div>
          ))}
        </div>
        <div className="wrapperUserInfor2">
          {props.DataUserSearchPush.map((e) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: 20,
                paddingRight: 20,
              }}
              key={e}
            >
              <p>ID: {e}</p>

              <p onClick={() => HandleDeleteData(e)}>Delete</p>
            </div>
          ))}
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
