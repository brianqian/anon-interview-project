import React from 'react';
import DataFetchWrapper from '../../components/DataFetchWrapper';
import DisplayStudents from '../../components/DisplayStudents';

function App() {
  const API_LINK = 'https://www.hatchways.io/api/assessment/students';
  return (
    <div className="App">
      <DataFetchWrapper source={API_LINK}>
        <DisplayStudents />
      </DataFetchWrapper>
    </div>
  );
}

export default App;
