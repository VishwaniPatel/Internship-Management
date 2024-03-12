/**
 * for searchdata
 * @param {*} SearchData
 * @param {*} search
 * @returns
 */
const useSearch = (SearchData, search, key) => {
    if (!search) {
      return SearchData;
    }
    else {
      const filterData = SearchData.filter((res) => {
        return res[key]
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      return filterData;
    }
  };
  export default useSearch;