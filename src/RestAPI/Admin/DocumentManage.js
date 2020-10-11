const DocumentManage = (IDRoom) => {
  var url = `http://localhost:8000/DocumentManage`;
  return fetch(url).then((response) => response.json());
};

export default DocumentManage;
