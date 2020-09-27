import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Document.scss";
import { Scrollbars } from "react-custom-scrollbars";
import Folder from "../../../public/image/folder2.png";
import GetFolderFromRoom from "../../../RestAPI/Folder/GetFolderFromRoom";
import { connect } from "react-redux";

Document.propTypes = {};

function Document(props) {
  const [DataDocument, setDataDocument] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  var dataArrayFolder = JSON.parse(JSON.stringify(props.DataFolderRoom));
  var DataFolderRoom = [];

  useEffect(() => {
    // setDataRoom(["2", "3"]);
    // console.log("??");
    // console.log(dataRoom);
    // GetFolderFromRoom(101)
    //   .then((json) => {
    //     DataFolderRoom = JSON.parse(JSON.stringify(json));
    //     console.log(DataFolderRoom);
    //     if (DataFolderRoom.dataString === "THANH_CONG") {
    //       // if (handleLogin) {
    //       //   handleLogin();
    //       //   SaveDataLogin(DataLoginUser);
    //       // }
    //     } else {
    //       alert("NetWork fail");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error + "fail");
    //   });
  }, []);

  const HandleGetFolderFromRoom = () => {
    GetFolderFromRoom(101)
      .then((json) => {
        DataFolderRoom = JSON.parse(JSON.stringify(json));
        console.log(DataFolderRoom.data);

        props.dispatch({
          type: "SetDataFolder",
          data: DataFolderRoom.data,
        });
        console.log(DataFolderRoom.data);
        if (DataFolderRoom.dataString === "THANH_CONG") {
          // if (handleLogin) {
          //   handleLogin();
          //   SaveDataLogin(DataLoginUser);
          // }
        } else {
          alert("NetWork fail");
        }
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };

  return (
    <Scrollbars style={styles.wrapperDocument}>
      <button onClick={HandleGetFolderFromRoom} />
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

        {props.DataFolderRoom.map((e) => (
          <div className="wrapperFolder">
            <div className="wrapperNameFolder">
              <img className="wrapperImage" src={Folder} alt="user" />
              <p>{e.Name}</p>
            </div>
            <div className="wrapperdiv"></div>
            <div className="wrapperOwner">
              <p>{e.IDuser}</p>
            </div>
            <div className="wrapperTime">
              <p>{e.SendTime}</p>
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
  };
}
export default connect(mapStateToProps)(Document);
