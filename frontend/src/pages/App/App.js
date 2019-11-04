import React from 'react';
import DataFetchWrapper from '../../components/DataFetchWrapper';
import DisplayStudents from '../../components/DisplayStudents';
import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
body, html{
  font-family: 'Roboto';
  min-width: 100vw;
  min-height: 100vh;
  background-color: #eaeaea;

}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input{
  border: none;
  border-bottom: 1px solid black;
  line-height: 24px;
  margin: 5px 0;
  font-size: 18px;
  padding-bottom: 4px;
  ::placeholder{
    padding: 8px 0;
    opacity: .8;
  }
}
`;

function App() {
  const API_LINK = 'http://localhost:3001/frontend/api';
  return (
    <DataFetchWrapper source={API_LINK}>
      <GlobalStyle />
      <DisplayStudents />
    </DataFetchWrapper>
  );
}

export default App;
