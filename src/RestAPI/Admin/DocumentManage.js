const DocumentManage = async (IDRoom) => {
  var url = `http://localhost:8000/DocumentManage`;
  return await fetch(url).then((response) => response.json());
};

export default DocumentManage;
