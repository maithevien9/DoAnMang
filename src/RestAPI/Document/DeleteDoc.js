const DeleteDoc = async (IDFolder, token) => {
  var url = `http://192.168.137.64:8000/DeleteDocument/${IDFolder}`;

  return await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Token: token,
    }),
  }).then((response) => response.json());
};
export default DeleteDoc;
