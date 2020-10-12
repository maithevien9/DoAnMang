const LoginAPI = async (Token) => {
  var url = `http://192.168.137.64:8000/CheckLogin/${Token}`;
  return await fetch(url).then((response) => response.json());
};

export default LoginAPI;
