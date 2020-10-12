const MyDocument = (token) => {
  var url = `http://192.168.137.64:8000/MyDocument/${token}`;
  return fetch(url).then((response) => response.json());
};

export default MyDocument;
