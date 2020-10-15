const ChangePassWord = async (IDFolder, PassWord, token) => {
  var url = `http://localhost:8000/ChangePassWord/`;

  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      IDFolder: IDFolder,
      Token: token,
      PassWord: PassWord,
    }),
  }).then((response) => response.json());
};
export default ChangePassWord;
