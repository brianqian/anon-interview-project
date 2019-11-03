import { useState, useEffect } from 'react';

const useFilter = (dataset, filterParam, filterValue) => {
  const [filteredData, setFilteredData] = useState(dataset);

  useEffect(() => {
    if (!filterValue) return;
    const _filteredData = dataset.filter((item) => {
      console.log(item, filterParam, filterValue);
      return item[filterParam].includes(filterValue);
    });
    setFilteredData(_filteredData);
  }, [dataset, filterValue]);

  return [filteredData];
};

export default useFilter;
