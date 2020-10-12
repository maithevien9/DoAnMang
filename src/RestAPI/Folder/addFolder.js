const addFolder = async (
  Name,
  PassWord,
  isPassWord,
  IDRoom,
  Token,
  level,
  IDParent
) => {
  var url = "http://192.168.137.64:8000/Folder/";
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FolderName: Name,
      FolderPassWord: PassWord,
      isPassword: isPassWord,
      IDRoom: IDRoom,
      Token: Token,
      level: level,
      IDParent: IDParent,
    }),
  }).then((response) => response.json());
};

export default addFolder;
