import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Navigation/Routes';

function App(): JSX.Element {
  // const darkTheme = createMuiTheme({
  //   palette: {
  //     type: 'dark',
  //   },
  // });

  return (
    <Router>{Routes}</Router>
    // <ThemeProvider theme={darkTheme}>
    //   <Router>{Routes}</Router>
    // </ThemeProvider>
  );
}

export default App;
