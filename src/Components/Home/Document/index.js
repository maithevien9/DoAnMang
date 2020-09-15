import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Document.scss";
import { Scrollbars } from "react-custom-scrollbars";
import Folder from "../../../public/image/folder.png";

Document.propTypes = {};

function Document(props) {
  const [DataDocument, setDataDocument] = useState([]);
  return (
    <Scrollbars style={styles.wrapperDocument}>
      <div className="wrapperRooms">
        <div className="wrapper4Room" style={{ display: "flex" }}>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 101</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 102</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 103</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 104</p>
          </div>
        </div>

        <div className="wrapper4Room" style={{ display: "flex" }}>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 201</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 202</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 203</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 204</p>
          </div>
        </div>

        <div className="wrapper4Room" style={{ display: "flex" }}>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 301</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 302</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 303</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 304</p>
          </div>
        </div>

        <div className="wrapper4Room" style={{ display: "flex" }}>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 401</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 402</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 403</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 404</p>
          </div>
        </div>

        <div className="wrapper4Room" style={{ display: "flex" }}>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 501</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 502</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 503</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 504</p>
          </div>
        </div>

        <div className="wrapper4Room" style={{ display: "flex" }}>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 601</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 602</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 603</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 604</p>
          </div>
        </div>

        <div className="wrapper4Room" style={{ display: "flex" }}>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 701</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 702</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 703</p>
          </div>
          <div className="wrapperRoom">
            <img className="imageRoom" src={Folder} alt="user" />
            <p className="textRooms">Room 704</p>
          </div>
        </div>
      </div>
    </Scrollbars>
  );
}
var styles = {
  wrapperDocument: {
    width: 1800,
    height: 825,
    backgroundColor: "#E8E8E8",
  },
};
export default Document;
