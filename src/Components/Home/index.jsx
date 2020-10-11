import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header/index";
import TreeView from "./Menu/index";
import Document from "./Document/index.js";
import Modal from "react-modal";
import ProviderManager from "./ProvideManage/index.js";
import Register from "./Register/index";

Home.propTypes = {
  handleLogOut: PropTypes.func,
};
Home.Authenication = {
  handleLogOut: null,
};

function Home(props) {
  const { handleLogOut } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  function handleLogOut2() {
    if (handleLogOut) {
      handleLogOut();
    }
  }
  const HandleProvide = () => {
    setModalIsOpen(true);
  };
  const HandleProvideClose = () => {
    setModalIsOpen(false);
  };
  const HandleProvide2 = () => {
    setModalIsOpen2(true);
  };
  const HandleProvideClose2 = () => {
    setModalIsOpen2(false);
  };
  return (
    <div style={styles.wrapper}>
      <Header
        handleLogOut2={handleLogOut2}
        HandleProvide={HandleProvide}
        HandleProvide2={HandleProvide2}
      />
      <div className="wrapperMenuDocu" style={{ display: "flex" }}>
        <TreeView />
        <Document />
      </div>
      <Modal isOpen={modalIsOpen}>
        <ProviderManager HandleProvideClose={HandleProvideClose} />
      </Modal>
      <Modal isOpen={modalIsOpen2}>
        <Register HandleProvideClose2={HandleProvideClose2} />
      </Modal>
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
