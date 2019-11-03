import React, { useEffect, useState } from 'react';

function DataFetchWrapper({ source, children }) {
  const [retrievedData, setRetrievedData] = useState(null);

  useEffect(() => {
    const fetchData = async (source) => {
      try {
        const resp = await fetch(source);
        if (resp.status !== 200) throw Error(resp.status);
        const data = await resp.json();
        setRetrievedData(data);
      } catch (e) {
        console.error('Error!', e.message);
      }
    };
    fetchData(source);
  }, [source]);

  // React.cloneElement(children, )
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { data: retrievedData });
      })}
    </div>
  );
}

export default DataFetchWrapper;
