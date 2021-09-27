import React, { Component } from 'react';
import { COLORS } from '@data/consts';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { Router } from './router';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary
    },
    secondary: {
      main: COLORS.secondary[0]
    },
    background: {
      default: COLORS.primary
    },
    text: {
      primary: COLORS.textPrimary
    }
  },
  typography: {
    fontFamily: 'Helvetica Neue'
  }
});

export default class App extends Component {
  public render(): React.ReactNode {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
