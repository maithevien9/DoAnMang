const GetFileFolderFromFolder = async (IDRoom) => {
  var url = `http://192.168.137.64:8000/GetFileFolder/${IDRoom}`;
  return await fetch(url).then((response) => response.json());
};

export default GetFileFolderFromFolder;
