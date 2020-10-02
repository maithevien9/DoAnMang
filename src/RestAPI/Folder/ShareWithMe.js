const ShareWithMe = (token) => {
  var url = `http://localhost:8000/GetFileShare/${token}`;
  return fetch(url).then((response) => response.json());
};

export default ShareWithMe;
