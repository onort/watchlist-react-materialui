import React from 'react';
import ReactDOM from 'react-dom';

import {green700, grey800} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey800,
    primary1Color: green700
  },
  appBar: {
    height: 42,
  },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.querySelector('#app')
);
