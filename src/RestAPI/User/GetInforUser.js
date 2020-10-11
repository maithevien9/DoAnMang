const GetInforUserAPI = (Token) => {
  var url = `http://localhost:8000/GetInforUser/${Token}`;
  return fetch(url).then((response) => response.json());
};

export default GetInforUserAPI;
