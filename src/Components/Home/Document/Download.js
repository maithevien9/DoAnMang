const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
export default function HandleDownLoadFile(value) {
  alert(value);
  //   GetFolderFromRoom(value).catch((error) => {
  //     console.error(error + "fail");
  //   });
  openInNewTab(`http://localhost:8000/download/${value}`);
}
