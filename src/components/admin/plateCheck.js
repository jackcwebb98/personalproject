import React, { Component } from 'react';
import NavBar from '../navbar';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Button } from '@material-ui/core';

const drawerWidth = 60;

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
  },
  view: {
    width: `calc(100vw - ${drawerWidth}px)`,
    marginLeft: 80,
    height: '100vh',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '50%',
    width: '50%',
  },
});

class PlateCheck extends Component {
  constructor() {
    super();
    this.state = {
      plateNumber: '',
    };
  }

  test = () => {
    console.log(this.state.plateNumber);
  };

  handleInput = (prop, val) => {
    this.setState({
      [prop]: val,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar history={this.props.history} />
        <div className={classes.view}>
          <Paper className={classes.paper}>
            <Button onClick={this.test} variant="outlined">
              test
            </Button>
            <TextField
              label="License Plate Number"
              onChange={e => this.handleInput('plateNumber', e.target.value)}
            />
            <Input type="file" />
          </Paper>
        </div>
      </div>
    );
  }
}

PlateCheck.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlateCheck);
