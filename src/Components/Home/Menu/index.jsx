import React from "react";
import PropTypes from "prop-types";
import "./Menu.scss";
import Add from "../../../public/image/plus.png";
index.propTypes = {};

function index(props) {
  return (
    <div className="wrapper">
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
          <div className="textMenu">
            <p>My document</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <div className="textMenu">
            <p>Shared with me</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <div className="textMenu">
            <p>Provide admin rights</p>
          </div>
        </div>
      </div>

      <div className="wrapperBtnMenu" style={styles.wrapperBtnAdd}>
        <div className="btnMenu" style={styles.btnAdd}>
          <div className="textMenu">
            <p>Document manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
var styles = {
  wrapperBtnAdd: {},
};
export default index;
