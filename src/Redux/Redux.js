import { createStore, combineReducers } from "redux";

var dataUser1 = localStorage.getItem("@save");
if (dataUser1 == null) {
  var dataUser = [
    {
      dataString: "KHONG_THANH_CONG",
      data: [],
      token: "",
    },
  ];
} else {
  var dataUser = JSON.parse(dataUser1);
}

var dataFolderFromRoom = [];
var dataFromFolder = [];
var FileFromFolder = [];
var DataBack = [{ id: "temp" }];
var IDRoom = 101;
var IDFolder = 1999999999;
// console.log(dataUser);

const dataUserReducer = (state = dataUser, action) => {
  return state;
};
const dataFromFolderReducer = (state = dataFromFolder, action) => {
  if (action.type === "SetDataFolderDocument") return action.data;
  return state;
};
const FileFromFolderReducer = (state = FileFromFolder, action) => {
  if (action.type === "SetDataFile") return action.dataFile;
  return state;
};
const dataFolderFromRoomReducer = (state = dataFolderFromRoom, action) => {
  if (action.type === "SetDataFolder") return action.data;
  return state;
};
const DataBackReducer = (state = DataBack, action) => {
  if (action.type === "SetBackAdd") {
    return [
      {
        id: action.data,
      },
    ].concat(state);
  }
  if (action.type === "Setback") {
    if (state.length >= 3) {
      return state.filter((element) => element.id != action.IDFolder);
    }
  }
  if (action.type === "Reset") {
    return state.filter((element) => element.id == "temp");
  }
  return state;
};
const IDRoomReducer = (state = IDRoom, action) => {
  if (action.type === "SetIDRoom") return action.ID;
  return state;
};

const IDFolderReducer = (state = IDFolder, action) => {
  if (action.type === "SetIDFolder") return action.ID;
  return state;
};
const reducer = combineReducers({
  DataUser: dataUserReducer,
  DataFolderRoom: dataFolderFromRoomReducer,
  dataFromFolder: dataFromFolderReducer,
  FileFromFolder: FileFromFolderReducer,
  DataBack: DataBackReducer,
  IDRoom: IDRoomReducer,
  IDFolder: IDFolderReducer,
});
const store = createStore(reducer);

export default store;
