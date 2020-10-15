import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SharedDocument.scss";
import checkPassWord from "../../../../RestAPI/Folder/CheckPassWord.js";
import GetFolderAndFileFromFolder from "../../../../RestAPI/Folder/GetFolderAndFileFromFolder.js";
import SearchUser from "../../../../RestAPI/User/SearchUser.js";
import { connect } from "react-redux";
import sharedFolder from "../../../../RestAPI/Folder/sharedFolder.js";
import sharedDocument from "../../../../RestAPI/Document/sharedDocument.js";

SharedDocument.propTypes = {
  handleCloseSharedDocument: PropTypes.func,
  IDDocValue: PropTypes.number,
};
SharedDocument.Authenication = {
  handleCloseSharedDocument: null,
};

function SharedDocument(props) {
  const { handleCloseSharedDocument, IDDocValue } = props;
  const [UserName, setUserName] = useState("");
  const HandleClose = () => {
    handleCloseSharedDocument();
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
    sharedDocument(IDDocValue, props.DataUserSearchPush, props.DataUser.token)
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
        <h2>Share File</h2>
        <button onClick={() => HandleClose()}></button>
      </div>
      <div className="wrapperMain">
        <div className="wrapperSearchUser" >
          <input
            className="formText"
            type="text"
            name="name"
            onChange={handleTextPassWord}
            value={UserName}
          />
          <button className="btnSS" onClick={() => handleCheck()}> Search User</button>
          <button className="btnSS" onClick={() => handleShare()}> Share</button>
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
                <div className="wrapperid"><p>{e.ID}</p> </div>
                <div className="wrappername"><p>{e.Name}</p> </div>
                <div className="wrapperidroom"><p>{e.IDRoom}</p> </div>
                <button onClick={() => handleClickAdd(e.ID)}>Add</button>
              </div>
            ))}
          </div>
          <div className="wrapperUserInfor2">
            {props.DataUserSearchPush.map((e) => (
              <div
                className="wrapperShow2"
                key={e}
              >
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
export default connect(mapStateToProps)(SharedDocument);
