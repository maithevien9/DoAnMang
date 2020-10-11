const SearchUser = (Name) => {
  var url = `http://localhost:8000/SearchUser/${Name}`;

  return fetch(url).then((response) => response.json());
};
export default SearchUser;
