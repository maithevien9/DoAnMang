const GetFileFolderFromFolder = async (IDRoom) => {
  var url = `http://localhost:8000/GetFileFolder/${IDRoom}`;
  return await fetch(url).then((response) => response.json());
};

export default GetFileFolderFromFolder;
