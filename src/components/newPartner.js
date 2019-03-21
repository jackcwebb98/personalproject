import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../ducks/reducer';
import { withStyles, Paper, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  view: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    height: '60%',
    width: '50%',
    
  },
});

class NewPartner extends Component {
  constructor() {
    super();
    this.state = {
      companyName: '',
      businessType: '',
      username: '',
      password: '',
    };
  }

  handleInput = (prop, val) => {
    this.setState({
      [prop]: val,
    });
  };

  register = async () => {
    let user = {
      companyName: this.state.companyName,
      businessType: this.state.businessType,
      username: this.state.username,
      password: this.state.password,
    };
    try {
      let res = await axios.post(`/auth/register`, user);
      this.props.updateUser({
        companyId: res.data.company_id,
        username: res.data.admin_username,
        businessType: res.data.business_type,
        companyName: res.data.company_name,
      });
      this.props.history.push('/allcustomers');
    } catch (err) {
      console.log(err);
      alert('choose a unique username');
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.view}>
          <Paper className={classes.paper}>
            <Typography variant="title">New Partner</Typography>
            <TextField
              label="Company Name"
              onChange={e => this.handleInput('companyName', e.target.value)}
            />{' '}
            <br />
            <TextField
              label="Business Type"
              onChange={e => this.handleInput('businessType', e.target.value)}
            />{' '}
            <br />
            <TextField
              label="Admin Username"
              onChange={e => this.handleInput('username', e.target.value)}
            />{' '}
            <br />
            <TextField
              type="password"
              label="Admin Password"
              onChange={e => this.handleInput('password', e.target.value)}
            />{' '}
            <br />
            <Button onClick={this.register} variant="outlined">
              Register
            </Button>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="outlined">Home</Button>
            </Link>
          </Paper>
        </div>
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
)(withStyles(styles)(NewPartner));
