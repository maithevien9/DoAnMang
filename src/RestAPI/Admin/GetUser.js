const GetUser = async () => {
  var url = `http://192.168.137.64:8000/GetUser`;
  return await fetch(url).then((response) => response.json());
};

export default GetUser;
