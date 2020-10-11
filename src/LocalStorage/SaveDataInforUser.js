const SaveDataInforUser = async (data) => {
  await localStorage.setItem("@saveInFor", JSON.stringify(data));
  console.log("Data" + JSON.stringify(data));
};

export default SaveDataInforUser;
