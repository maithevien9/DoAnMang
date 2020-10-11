const register = (user, password, room) => {
  var url = "http://localhost:8000/Register/";
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      User: user,
      PassWord: password,
      Room: room,
    }),
  }).then((response) => response.json());
};

export default register;
