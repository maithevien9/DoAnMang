const checkPassWord = (ID, password) => {
  var url = `http://localhost:8000/CheckPass/${password}/IDfolder/${ID}/`;

  return fetch(url).then((response) => response.json());
};

export default checkPassWord;
