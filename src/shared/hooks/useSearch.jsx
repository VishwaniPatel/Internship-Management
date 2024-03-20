/**
 * for searchdata
 * @param {*} SearchData - data on which search is performed
 * @param {*} search - Search term entered in searchbox
 * @param {*} key - key in database to perform search
 * @returns filtered data 
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