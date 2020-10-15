const LoginAPI = async (Token) => {
  var url = `http://localhost:8000/CheckLogin/${Token}`;
  return await fetch(url).then((response) => response.json());
};

export default LoginAPI;
