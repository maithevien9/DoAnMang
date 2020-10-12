const ShareWithMe = async (token) => {
  var url = `http://192.168.137.64:8000/GetFileShare/${token}`;
  return await fetch(url).then((response) => response.json());
};

export default ShareWithMe;
