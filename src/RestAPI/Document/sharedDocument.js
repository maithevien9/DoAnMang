const sharedDocument = (IDDoc, IDUser, Token) => {
  var url = "http://localhost:8000/SharedDocument/";
  return fetch(url, {
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
