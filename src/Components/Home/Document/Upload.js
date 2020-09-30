import Upload from "../../../RestAPI/Document/Upload";

export default function HandleDownLoadFile(value) {
  alert(value);
  Upload(value);
  //   GetFolderFromRoom(value).catch((error) => {
  //     console.error(error + "fail");
  //   });
}
