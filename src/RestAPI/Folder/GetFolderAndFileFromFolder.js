const GetFileFolderFromFolder = (IDRoom) => {
  var url = `http://localhost:8000/GetFileFolder/${IDRoom}`;
  return fetch(url).then((response) => response.json());
};

export default GetFileFolderFromFolder;
