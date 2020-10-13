const ChangName = async (IDFolder, Name, token) => {
  var url = `http://localhost:8000/ChangeName/`;

  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      IDFolder: IDFolder,
      Token: token,
      Name: Name,
    }),
  }).then((response) => response.json());
};
export default ChangName;
