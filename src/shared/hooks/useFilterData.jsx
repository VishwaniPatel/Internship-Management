import { useState, useEffect } from 'react';

const useFilterData = (data, filterCriteria) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!filterCriteria || filterCriteria.length === 0) {
      // If no filter criteria or all criteria are cleared, return the original data
      setFilteredData(data);
    } else {
      // Filter the data based on the provided filter criteria
      const filtered = data.filter(item => filterCriteria.includes(item.domain));
      setFilteredData(filtered);
    }
  }, [data, filterCriteria]);

  return filteredData;
};

export default useFilterData;
