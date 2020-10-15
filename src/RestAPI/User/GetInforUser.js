const GetInforUserAPI = async (Token) => {
  var url = `http://localhost:8000/GetInforUser/${Token}`;
  return await fetch(url).then((response) => response.json());
};

export default GetInforUserAPI;
