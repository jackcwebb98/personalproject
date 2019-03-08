import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Paper, withStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    flexDirection: 'column',
  },
  paper: {
    width: '60%',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  wrapper: {
    alignItems: '',
  },
});

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      companyList: [],
      customerCompanyId: 0,
      customerName: '',
      plateNumber: '',
      vehicle: '',
    };
  }

  componentDidMount = () => {
    this.getCompanies();
  };

  getCompanies = async () => {
    let res = await axios.get(`/api/companies`);
    this.setState({
      companyList: res.data,
    });
  };

  handleIdInput = value => {
    this.setState({
      customerCompanyId: value.value,
    });
  };

  handleInput = (prop, val) => {
    this.setState({
      [prop]: val,
    });
  };

  newCustomer = async () => {
    let user = {
      customerCompanyId: this.state.customerCompanyId,
      customerName: this.state.customerName,
      plateNumber: this.state.plateNumber,
      vehicle: this.state.vehicle,
    };

    let res = await axios.post(`/customer/new`, user);
    if (res) {
      alert('Customer created successfully!'); //maybe Material UI alert is better?
      this.props.history.push('/');
    } else {
      alert('There was an error. please try again.');
    }
  };

  render() {
    const { classes } = this.props;
    const mappedState = this.state.companyList.map(company => {
      return {
        value: company.company_id,
        label: company.company_name,
      };
    });
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <div>New Customer</div>
          <TextField
            label="Customer Name"
            onChange={e => this.handleInput('customerName', e.target.value)}
          />
          <br />
          <TextField
            label="License Plate Number"
            onChange={e => this.handleInput('plateNumber', e.target.value)}
          />{' '}
          <br />
          <TextField
            label="Vehicle Model"
            onChange={e => this.handleInput('vehicle', e.target.value)}
          />{' '}
          <br />
          <div className={classes.wrapper}>
            <Select options={mappedState} onChange={this.handleIdInput} />{' '}
            <br />
          </div>
          <Button onClick={this.newCustomer}>submit</Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserPage);
