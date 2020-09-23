const LoginAPI = (user, password) => {
  var url = "http://localhost:8000/Login/";
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      User: user,
      PassWord: password,
    }),
  }).then((response) => response.json());
};

export default LoginAPI;