const SearchAPI = async (keyWord) => {
  var url = `http://localhost:8000/Search/${keyWord}`;
  return await fetch(url).then((response) => response.json());
};

export default SearchAPI;
