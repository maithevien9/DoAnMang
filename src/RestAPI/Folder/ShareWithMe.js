const ShareWithMe = async (token) => {
  var url = `http://localhost:8000/GetFileShare/${token}`;
  return await fetch(url).then((response) => response.json());
};

export default ShareWithMe;
