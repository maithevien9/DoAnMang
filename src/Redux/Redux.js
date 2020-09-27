import { createStore, combineReducers } from "redux";

var dataUser1 = localStorage.getItem("@save");
var dataUser = JSON.parse(dataUser1);
var dataFolderFromRoom = [];

// console.log(dataUser);

const dataUserReducer = (state = dataUser, action) => {
  return state;
};
const dataFolderFromRoomReducer = (state = dataFolderFromRoom, action) => {
  if (action.type === "SetDataFolder") return action.data;
  return state;
};
const reducer = combineReducers({
  DataUser: dataUserReducer,
  DataFolderRoom: dataFolderFromRoomReducer,
});
const store = createStore(reducer);

export default store;
