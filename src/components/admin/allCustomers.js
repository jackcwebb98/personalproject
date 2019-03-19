import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { clearUser, updateUser } from '../../ducks/reducer';
import NavBar from '../navbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
  },
  drawer: {
    width: 600,
    // flexShrink: 0,
  },
  view: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    midWidth: 700,
  },
  paper: {
    width: '75%',
  },
});

class AllCustomers extends Component {
  constructor() {
    super();
    this.state = {
      allCustomers: [],
    };
  }

  componentDidMount = async () => {
    await this.getUser();
    await this.getAllCustomers();
  };

  getAllCustomers = async () => {
    const { companyId } = this.props;
    try {
      let res = await axios.post(`/api/customers`, { companyId });
      this.setState({
        allCustomers: res.data,
      });
    } catch (err) {
      console.log(err);
      alert('There was an issue retrieving customer list');
    }
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

  deleteCustomer = customer => {
    let id = customer.user_id;
    axios.post(`/delete/customer`, { id }).then(() => {
      let foundCustomer = this.state.allCustomers.findIndex(
        customer => customer.user_id === id
      );
      let newState = this.state.allCustomers.slice();
      newState.splice(foundCustomer, 1);
      this.setState({
        allCustomers: newState,
      });
    });
  };

  logout = async () => {
    await axios.post(`/auth/logout`);
    this.props.clearUser();
    this.props.history.push('/');
  };

  render() {
    const { classes } = this.props;
    const mappedState = this.state.allCustomers.map((customer, id) => {
      return (
        <TableRow key={id}>
          <TableCell component="th" scope="row">
            {customer.real_name}
          </TableCell>
          <TableCell align="left">{customer.car_make}</TableCell>
          <TableCell align="left">{customer.plate_number}</TableCell>
          <Button onClick={() => this.deleteCustomer(customer)}>Delete</Button>
        </TableRow>
      );
    });
    return (
      <div className={classes.root}>
        <NavBar history={this.props.history} />
        <div className={classes.view}>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell align="left">License Plate</TableCell>
                  <TableCell align="left">Car Model</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{mappedState}</TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

AllCustomers.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => {
  return {
    companyId: reduxState.companyId,
    username: reduxState.username,
    companyName: reduxState.companyName,
  };
};

const mapDispatchToProps = {
  updateUser,
  clearUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AllCustomers));
