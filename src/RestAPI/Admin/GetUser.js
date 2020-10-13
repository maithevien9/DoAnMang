const GetUser = async () => {
  var url = `http://localhost:8000/GetUser`;
  return await fetch(url).then((response) => response.json());
};

export default GetUser;
