const register = async (user, password, room) => {
  var url = "http://192.168.137.64:8000/Register/";
  return await fetch(url, {
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
