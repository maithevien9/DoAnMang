const Upload = async (formdata) => {
  // console.log(IDFolder + " = " + Token);
  //   var url = `http://localhost:8000/Upload/`;
  //   return fetch(url).then((response) => response.json());

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return await fetch(
    "http://localhost:8000/upload/",
    requestOptions
  ).then((response) => response.json());
};

export default Upload;
