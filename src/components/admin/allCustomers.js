import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { clearUser, updateUser } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

class AllCustomers extends Component {
  constructor() {
    super();
    this.state = {
      allCustomers: [],
    };
  }

  testy = () => {
    console.log(this.state.allCustomers);
  };

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

  deleteCustomer(id) {
    console.log(id);
    // axios.delete(`/delete/customer`, {id})
  }

  logout = async () => {
    await axios.post(`/auth/logout`);
    this.props.clearUser();
    this.props.history.push('/');
  };

  render() {
    const mappedState = this.state.allCustomers.map((customer, id) => {
      return (
        <div key={id}>
          <p>{customer.real_name}</p>
          <Button onClick={() => this.deleteCustomer(customer.user_id)}>
            Delete
          </Button>
        </div>
      );
    });
    return (
      <div>
        <Button onClick={this.logout}>logout</Button>
        <Button onClick={this.testy}>test</Button>
        <Link to="/platecheck" style={{ textDecoration: 'none' }}>
          <Button>Plate Check</Button>
        </Link>
        {mappedState}
      </div>
    );
  }
}

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
)(AllCustomers);
