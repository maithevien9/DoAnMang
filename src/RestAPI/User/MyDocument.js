const MyDocument = (token) => {
  var url = `http://localhost:8000/MyDocument/${token}`;
  return fetch(url).then((response) => response.json());
};

export default MyDocument;
