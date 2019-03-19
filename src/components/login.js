import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../ducks/reducer';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    width: '50%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  button: {
    margin: 5,
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: {
        username: false,
        password: false,
      },
    };
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    const { companyId } = this.props;
    if (!companyId) {
      try {
        let res = await axios.get(`/api/current`);
        this.props.updateUser({
          companyId: res.data.company_id,
          username: res.data.admin_username,
          businessType: res.data.business_type,
          companyName: res.data.company_name,
        });
        this.props.history.push('/allcustomers');
      } catch (err) {
        console.log(err);
      }
    } else {
      this.props.history.push('/allcustomers');
    }
  };

  handleInput = (prop, val) => {
    this.setState({
      [prop]: val,
    });
  };

  validate = () => {
    const { username, password, error } = this.state;
    let hasError = false;
    if (!username) {
      error.username = hasError = true;
    }
    if (!password) {
      error.password = hasError = true;
    }
    this.setState({ error });
    return !hasError;
  };

  login = async () => {
    if (this.validate()) {
      let user = {
        username: this.state.username,
        password: this.state.password,
      };
      try {
        let res = await axios.post('/auth/login', user);
        this.props.updateUser({
          companyId: res.data.company_id,
          username: res.data.admin_username,
          businessType: res.data.business_type,
          companyName: res.data.company_name,
        });
        this.props.history.push('/allcustomers');
      } catch (err) {
        console.log(err);
        alert('Incorrect username or password');
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { username, password, error } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="headline">Plate Checker</Typography>
          <TextField
            error={error.username}
            label="Username"
            className={classes.textField}
            value={username}
            onChange={e => this.handleInput('username', e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={error.password}
            label="Password"
            type="password"
            className={classes.textField}
            value={password}
            onChange={e => this.handleInput('password', e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <div className={classes.wrapper}>
            <Button
              className={classes.button}
              variant="contained"
              size="small"
              color="primary"
              onClick={this.login}
            >
              Submit
            </Button>{' '}
            <Link to="/userpage" style={{ textDecoration: 'none' }}>
              <Button
                className={classes.button}
                variant="contained"
                size="small"
                color="primary"
              >
                Register a Vehicle
              </Button>
            </Link>
            <Link to="/newpartner" style={{ textDecoration: 'none' }}>
              <Button
                className={classes.button}
                variant="contained"
                size="small"
                color="primary"
              >
                New Partner
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    companyId: reduxState.companyId,
    username: reduxState.username,
    companyName: reduxState.companyName,
    businessType: reduxState.businessType,
  };
};

const mapDispatchToProps = {
  updateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
