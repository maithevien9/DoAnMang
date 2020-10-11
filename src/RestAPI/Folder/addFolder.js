const addFolder = (
  Name,
  PassWord,
  isPassWord,
  IDRoom,
  Token,
  level,
  IDParent
) => {
  var url = "http://localhost:8000/Folder/";
  return fetch(url, {
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
