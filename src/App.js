import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import defaultTheme from './themes/defaultTheme';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './ducks/store';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#F29898',
      borderRadius: 5,
    },
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <HashRouter>
          <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <div className={classes.root}>{routes}</div>
          </MuiThemeProvider>
        </HashRouter>
      </Provider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
