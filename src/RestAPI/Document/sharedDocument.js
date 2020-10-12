const sharedDocument = async (IDDoc, IDUser, Token) => {
  var url = "http://192.168.137.64:8000/SharedDocument/";
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      IDdocument: IDDoc,
      IDUser: IDUser,
      Token: Token,
    }),
  }).then((response) => response.json());
};

export default sharedDocument;
