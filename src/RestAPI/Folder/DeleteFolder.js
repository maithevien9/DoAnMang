const DeleteFolder = (IDFolder, token) => {
  var url = `http://localhost:8000/DeleteFolder/${IDFolder}`;

  return fetch(url, {
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
export default DeleteFolder;
