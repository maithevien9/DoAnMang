import React from "react";
import PropTypes from "prop-types";
import Header from "./Header/index";
import TreeView from "./Menu/index";
import Document from "./Document/index.js";

Home.propTypes = {
  handleLogOut: PropTypes.func,
};
Home.Authenication = {
  handleLogOut: null,
};

function Home(props) {
  const { handleLogOut } = props;
  function handleLogOut2() {
    if (handleLogOut) {
      handleLogOut();
    }
  }
  return (
    <div style={styles.wrapper}>
      <Header handleLogOut2={handleLogOut2} />
      <div className="wrapperMenuDocu" style={{ display: "flex" }}>
        <TreeView />
        <Document />
      </div>
    </div>
  );
}

var styles = {
  wrapper: {
    padding: 20,
    backgroundColor: "white",
  },
};
export default Home;
