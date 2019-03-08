import React, {Component} from 'react'
import axios from 'axios';
import Select from 'react-select'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { Paper, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  paper: {
    width: 350,
    height: 400
  }
})

class UserPage extends Component {
  constructor(){
    super()
    this.state = {
      companyList: [],
      customerCompanyId: 0,
      customerName: '',
      plateNumber: '',
      vehicle: ''
    }
  }
  
  componentDidMount = () => {
    this.getCompanies()
  }

  getCompanies = async () => {
    let res = await axios.get(`/api/companies`)
    this.setState({
      companyList: res.data
    })
  }

  handleIdInput = (value) => {
    this.setState({
      customerCompanyId: value.value
    })
  }

  handleInput = (prop, val) => {
    this.setState({
      [prop]: val
    })
  }

  newCustomer = async () => {
    let user = {
      customerCompanyId: this.state.customerCompanyId,
      customerName: this.state.customerName,
      plateNumber: this.state.plateNumber,
      vehicle: this.state.vehicle
    }

    let res = await axios.post(`/customer/new`, user)
    if (res) {
      alert('Customer created successfully!') //maybe Material UI alert is better?
      this.props.history.push('/')
    } else {
      alert('There was an error. please try again.')
    }
  }
  
  render(){
    const mappedState = this.state.companyList.map((company) => {
      return {
        value: company.company_id,
        label: company.company_name
      }
    })
    return(
      <div>
        <CssBaseline />
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item> 
          <Paper >
              <Input placeholder="Customer Name" onChange={e => this.handleInput('customerName', e.target.value)}/> <br/>
              <Input placeholder="License Plate Number" onChange={e => this.handleInput('plateNumber', e.target.value)}/> <br/>
              <Input placeholder="Vehicle Make and Model" onChange={e => this.handleInput('vehicle', e.target.value)}/> <br/>
              <Select 
                options={mappedState} 
                onChange={this.handleIdInput}
              /> <br />
              <Button onClick={this.newCustomer}>submit</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}



export default withStyles(styles)(UserPage)