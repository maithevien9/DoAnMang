const GetUser = () => {
  var url = `http://localhost:8000/GetUser`;
  return fetch(url).then((response) => response.json());
};

export default GetUser;
