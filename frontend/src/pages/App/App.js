import React from 'react';
import DataFetchWrapper from '../../components/DataFetchWrapper';
import DisplayStudents from '../../components/DisplayStudents';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components/macro';
import { theme } from '../../utils/cssTheme';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap');
body, html{
  font-family: 'Roboto Condensed';
  min-width: 100vw;
  min-height: 100vh;
  background-color: #eaeaea;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color: black;
    :visited {
      color:  black;
    }
}
`;

const CenterPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const API_LINK = 'https://www.hatchways.io/api/assessment/students';
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CenterPage>
        <DataFetchWrapper source={API_LINK}>
          <DisplayStudents />
        </DataFetchWrapper>
      </CenterPage>
    </ThemeProvider>
  );
}

export default App;
