import React, { Component } from 'react';
import NavBar from '../navbar';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { Paper, Button } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { clearUser, updateUser } from '../../ducks/reducer';

import axios from 'axios';

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
  constructor(props) {
    super(props);
    this.state = {
      plateNumber: '',
      foundCustomer: [],
      falseAlert: false,
      trueAlert: false,
    };
  }

  test = () => {
    console.log(this.state.foundCustomer[0]);
  };

  componentDidMount = async () => {
    await this.getUser();
  };

  getUser = async () => {
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
      } catch (err) {
        this.props.history.push('/');
      }
    }
  };

  handleInput = (prop, val) => {
    this.setState({
      [prop]: val,
    });
  };

  submit = async () => {
    let user = {
      companyId: this.props.companyId,
      plateNumber: this.state.plateNumber,
    };
    console.log(user);

    await axios.post(`/api/platecheck`, user).then(res => {
      this.setState({
        foundCustomer: res.data,
      });
    });
  };

  handleDialog = (prop, val) => {
    this.setState({
      [prop]: val,
    });
  };

  render() {
    const { classes } = this.props;
    const customer = this.state.foundCustomer[0];
    return (
      <div className={classes.root}>
        <NavBar history={this.props.history} />
        <div className={classes.view}>
          <Dialog
            open={this.state.trueAlert}
            onClose={() => this.handleDialog('trueAlert', false)}
          >
            <DialogTitle>customer Name</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {/* Customer: {customer.real_name} */}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Paper className={classes.paper}>
            <Button onClick={this.test} variant="outlined">
              test
            </Button>
            <Button onClick={this.submit} variant="outlined">
              submit
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
  clearUser,
};

PlateCheck.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PlateCheck));
