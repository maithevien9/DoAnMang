const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "http://192.168.1.12:8080/Login/";
fetch(url, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    User: "vien",
    PassWord: "123",
  }),
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  })
  .catch((error) => {
    console.error(error + "fail");
  });
