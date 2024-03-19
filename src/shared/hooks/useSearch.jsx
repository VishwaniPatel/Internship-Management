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
        return key.some(key => {
          const value = res[key];
          if (typeof value === "string") {
            return value.toLowerCase().includes(search.toLowerCase());
          }
          return false;
        });
      });
      return filterData;
    }
  };
  export default useSearch;
  // const filterData = data.filter(item => {
  //   return searchKeys.some(key => {
  //     const value = item[key];
  //     if (typeof value === "string") {
  //       return value.toLowerCase().includes(searchTerm.toLowerCase());
  //     }
  //     return false;
  //   });
  // });
  // return filterData;