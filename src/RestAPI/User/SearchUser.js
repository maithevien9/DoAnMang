const SearchUser = async (Name) => {
  var url = `http://192.168.137.64:8000/SearchUser/${Name}`;

  return await fetch(url).then((response) => response.json());
};
export default SearchUser;
