import { createStore, combineReducers } from "redux";

var dataUser1 = localStorage.getItem("@save");
var dataUser = [];
if (dataUser1 == null) {
  dataUser = [
    {
      dataString: "KHONG_THANH_CONG",
      data: [],
      token: "",
    },
  ];
} else {
  dataUser = JSON.parse(dataUser1);
}

var dataFolderFromRoom = [];
var dataFromFolder = [];
var FileFromFolder = [];
var DataBack = [{ id: "temp" }];
var IDRoom = 1;
var level = 0;
var IDParent = null;
var IDFolder = 1999999999;
var arrUser = [];
var ValueCheckAdmin = true;
var ValueCheckManage = true;
var DataUserSearch = [];
var DataUserSearchPush = [];
var DataInforUser = [];
const DataInforUserReducer = (state = DataInforUser, action) => {
  if (action.type === "setDataInfor") return action.data;
  if (action.type === "ResetInfor") return action.data;
  return state;
};
const IDParentReducer = (state = IDParent, action) => {
  if (action.type === "setIDParent") return action.data;
  if (action.type === "ResetIDParent") return 0;
  return state;
};
const levelFolderReducer = (state = level, action) => {
  if (action.type === "setLevel") return action.data;
  if (action.type === "ResetLevel") return 0;
  return state;
};
const DataUserSearchReducer = (state = DataUserSearch, action) => {
  if (action.type === "SetDataUserSearch") return action.data;
  return state;
};
const DataUserSearchPushReducer = (state = DataUserSearchPush, action) => {
  if (action.type === "SetDataUserSearchPush")
    return [action.data].concat(state);
  if (action.type === "ResestDataUser") return [];
  // if (action.type === "delete") {
  //   return state.map((e) => {
  //     if (e !== action.ID) return e;
  //     console.log(e);
  //   });
  // }
  return state;
};

const ValueCheckAdminReducer = (state = ValueCheckAdmin, action) => {
  if (action.type === "setDataCheckAdmin") return action.data;
  return state;
};
const ValueCheckManagerReducer = (state = ValueCheckManage, action) => {
  if (action.type === "setDataCheckManager") return action.data;
  return state;
};
const arrUserReducer = (state = arrUser, action) => {
  if (action.type === "SetData") return action.data;
  return state;
};
const dataUserReducer = (state = dataUser, action) => {
  if (action.type === "Login") return action.data;
  return state;
};
const dataFromFolderReducer = (state = dataFromFolder, action) => {
  if (action.type === "SetDataFolderDocument") return action.data;

  return state;
};
const FileFromFolderReducer = (state = FileFromFolder, action) => {
  if (action.type === "AddFile")
    return [
      {
        name: action.Name,
        IDuser: action.ID,
        SendTime: action.SendTime,
      },
    ].concat(state);
  // if (action.type === "DeleteFile") {
  //   console.log("delete");
  //   return state.filter((e) => {
  //     if (e.ID !== action.IDfile) {
  //       return e;
  //     }
  //   });
  // }
  if (action.type === "DeleteFile") {
    console.log("delete");
    return state.filter((e) => {
      if (e.ID !== action.IDfile) {
        return e;
      }
    });
  }
  if (action.type === "SetDataFile") return action.dataFile;
  return state;
};
const dataFolderFromRoomReducer = (state = dataFolderFromRoom, action) => {
  if (action.type === "SetDataFolder") return action.data;
  if (action.type === "ChangNameFolder") {
    // return state.map((item, i) =>
    //   i === action.IDfolder ? { ...i, Name: action.Name } : item
    // );
    // console.log(action.Name);
    // console.log(action.IDfolder);
    return state.map((e) => {
      if (e.ID !== action.IDfolder) return e;
      else {
        return { ...e, Name: action.Name };
      }
    });
  }

  if (action.type === "DeleteFolder") {
    console.log("delete");
    return state.filter((e) => {
      if (e.ID !== action.IDfolder) {
        return e;
      }
    });
    // return state.map((e) => {
    //   if (e.ID !== action.IDfolder) return e;
    //   else {
    //     console.log(e);
    //   }
    // });
  }

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
  if (action.type === "ResetIDRoom") return 1;
  return state;
};

const IDFolderReducer = (state = IDFolder, action) => {
  if (action.type === "SetIDFolder") return action.ID;
  if (action.type === "ResetIDFolder") return 1999999999;
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
  arrUser: arrUserReducer,
  ValueCheckAdmin: ValueCheckAdminReducer,
  ValueCheckManager: ValueCheckManagerReducer,
  DataUserSearch: DataUserSearchReducer,
  DataUserSearchPush: DataUserSearchPushReducer,
  levelFolder: levelFolderReducer,
  IDParent: IDParentReducer,
  DataInforUser: DataInforUserReducer,
});
const store = createStore(reducer);

export default store;
