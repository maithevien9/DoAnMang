const sharedFolder = async (IDFolder, IDUser, Token) => {
  var url = "http://localhost:8000/Shared/";
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      IDFolder: IDFolder,
      IDUser: IDUser,
      Token: Token,
    }),
  }).then((response) => response.json());
};

export default sharedFolder;
