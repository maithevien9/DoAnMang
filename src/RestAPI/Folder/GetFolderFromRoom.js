const GetFolderFromRoom = (IDRoom) => {
  var url = `http://localhost:8000/GetFolder/${IDRoom}`;
  return fetch(url).then((response) => response.json());
};

export default GetFolderFromRoom;
