const DocumentManage = async (IDRoom) => {
  var url = `http://192.168.137.64:8000/DocumentManage`;
  return await fetch(url).then((response) => response.json());
};

export default DocumentManage;
