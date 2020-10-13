const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
export default async function HandleDownLoadFile(value) {
  alert(value);
  //   GetFolderFromRoom(value).catch((error) => {
  //     console.error(error + "fail");
  //   });
  await openInNewTab(`http://localhost:8000/download/${value}`);
}
