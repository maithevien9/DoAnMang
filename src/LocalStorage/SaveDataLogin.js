const SaveDataLogin = async (data) => {
  await localStorage.setItem("@save", JSON.stringify(data));
  console.log("Data" + JSON.stringify(data));
};

export default SaveDataLogin;
