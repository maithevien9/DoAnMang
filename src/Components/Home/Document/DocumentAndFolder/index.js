import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import "./Document.scss";
import { Scrollbars } from "react-custom-scrollbars";
import Folder from "../../../../public/image/folder2.png";

import { connect } from "react-redux";

DocumentEndFolder.propTypes = {};

function DocumentEndFolder(props) {
  var data = [1, 2, 3];
  const handleClickFolder = () => {};
  return (
    <Scrollbars style={styles.wrapperDocument}>
      <div className="wrapperRooms">
        <div className="wrapperHeader">
          <div className="wrapperNameFolder">
            <p>Name</p>
          </div>
          <div className="wrapperdiv"></div>
          <div className="wrapperOwner">
            <p>By ID</p>
          </div>
          <div className="wrapperTime">
            <p> Last Modified</p>
          </div>
        </div>

        {data.map((e) => (
          <div className="wrapperFolder" key={e.ID} onClick={handleClickFolder}>
            <div className="wrapperNameFolder">
              <img className="wrapperImage" src={Folder} alt="user" />
              <p>123</p>
            </div>
            <div className="wrapperdiv"></div>
            <div className="wrapperOwner">
              <p>321</p>
            </div>
            <div className="wrapperTime">
              <p>123321</p>
            </div>
          </div>
        ))}
        {/* <div className="wrapperFolder">
          <div className="wrapperNameFolder">
            <img className="wrapperImage" src={Folder} alt="user" />
            <p>Folder</p>
          </div>
          <div className="wrapperdiv"></div>
          <div className="wrapperOwner">
            <p>Owner</p>
          </div>
          <div className="wrapperTime">
            <p> Last Modified</p>
          </div>
        </div> */}

        <div className="wrapperHeaderFile"></div>

        <div className="wrapperFile">
          <div className="wrapperNameFolder">
            <p>File</p>
          </div>
          <div className="wrapperdiv"></div>
          <div className="wrapperOwner">
            <p>Owner</p>
          </div>
          <div className="wrapperTime">
            <p> Last Modified</p>
          </div>
        </div>
      </div>
    </Scrollbars>
  );
}
var styles = {
  wrapperDocument: {
    width: 1800,
    height: 950,
    backgroundColor: "#E8E8E8",
  },
};
function mapStateToProps(state) {
  return {
    DataUser: state.DataUser,
    DataFolderRoom: state.DataFolderRoom,
    dataFromFolder: state.dataFromFolder,
  };
}
export default connect(mapStateToProps)(DocumentEndFolder);
