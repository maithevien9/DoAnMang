const GetFolderFromRoom = async (IDRoom) => {
  var url = `http://localhost:8000/GetFolder/${IDRoom}`;
  return await fetch(url).then((response) => response.json());
};

export default GetFolderFromRoom;
