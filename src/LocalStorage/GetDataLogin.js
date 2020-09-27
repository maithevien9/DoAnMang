const GetDataLogin = async () => {
  var data = await localStorage.getItem("@save");

  return data;
};

export default GetDataLogin;
