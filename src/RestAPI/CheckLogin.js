const LoginAPI = (Token) => {
  var url = `http://localhost:8000/CheckLogin/${Token}`;
  return fetch(url).then((response) => response.json());
};

export default LoginAPI;
