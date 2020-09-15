import React from "react";
import PropTypes from "prop-types";
import Header from "./Header/index";
import Menu from "./Menu/index";
import Document from "./Document/index.js";

Home.propTypes = {};

function Home(props) {
  return (
    <div style={styles.wrapper}>
      <Header />
      <div className="wrapperMenuDocu" style={{ display: "flex" }}>
        <Menu />
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
