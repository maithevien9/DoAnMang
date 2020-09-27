import React from "react";
import PropTypes from "prop-types";
import "./Menu.scss";
import Add from "../../../public/image/plus.png";
import Folder from "../../../public/image/folder2.png";
import { Scrollbars } from "react-custom-scrollbars";
index.propTypes = {};

function index(props) {
  return (
    <Scrollbars className="wrapper" style={styles.wrapper}>
      <div className="wrapperBtnAdd" style={styles.wrapperBtnAdd}>
        <div className="btnAdd" style={styles.btnAdd}>
          <img className="imageAdd" src={Add} alt="user" />
          <div className="textAdd">
            <p>ADD</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <img className="imageRoom" src={Folder} alt="user" />
          <div className="textMenu">
            <p>Room 101</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <img className="imageRoom" src={Folder} alt="user" />
          <div className="textMenu">
            <p>Room 102</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <img className="imageRoom" src={Folder} alt="user" />
          <div className="textMenu">
            <p>Room 103</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <img className="imageRoom" src={Folder} alt="user" />
          <div className="textMenu">
            <p>Room 104</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <img className="imageRoom" src={Folder} alt="user" />
          <div className="textMenu">
            <p>Room 201</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <img className="imageRoom" src={Folder} alt="user" />
          <div className="textMenu">
            <p>Room 202</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <img className="imageRoom" src={Folder} alt="user" />
          <div className="textMenu">
            <p>Room 203</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <img className="imageRoom" src={Folder} alt="user" />
          <div className="textMenu">
            <p>Room 204</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <img className="imageRoom" src={Folder} alt="user" />
          <div className="textMenu">
            <p>Room 301</p>
          </div>
        </div>
      </div>
    </Scrollbars>
  );
}
var styles = {
  wrapperBtnAdd: {},
  wrapper: {
    height: 950,
    width: 400,
    backgroundColor: "#a4d3ee",
    marginRight: 10,
  },
};
export default index;
