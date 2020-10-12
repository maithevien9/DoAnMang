const ChangInforUserAPI = async (Token, Name, Address, Phone) => {
  var url = "http://192.168.137.64:8000/ChangInfor/";
  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Token: Token,
      Name: Name,
      Address: Address,
      Phone: Phone,
    }),
  }).then((response) => response.json());
};

export default ChangInforUserAPI;
