const provideManager = async (ID, value) => {
  console.log(value + " " + ID);
  var url = `http://localhost:8000/provideManage`;
  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      IDuser: ID,
      IDGroup: value,
    }),
  }).then((response) => response.json());
};

export default provideManager;
