const SearchUser = async (Name) => {
  var url = `http://localhost:8000/SearchUser/${Name}`;

  return await fetch(url).then((response) => response.json());
};
export default SearchUser;
