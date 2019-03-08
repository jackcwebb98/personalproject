import React, {Component} from 'react'
import axios from 'axios'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

import { connect } from 'react-redux'
import { updateUser } from '../ducks/reducer'

class NewPartner extends Component {
  constructor(){
    super()
    this.state = {
      companyName: '',
      businessType: '',
      username: '',
      password: ''
    }
  }


  handleInput = (prop, val) => {
    this.setState({
      [prop]: val
    })
  }

  register = async () => {
    let user = {
      companyName: this.state.companyName,
      businessType: this.state.businessType,
      username: this.state.username,
      password: this.state.password
    }
    try{
      let res = await axios.post(`/auth/register`, user)
      this.props.updateUser({
        companyId: res.data.company_id,
        username: res.data.admin_username,
        businessType: res.data.business_type,
        companyName: res.data.company_name
      })
      this.props.history.push('/allcustomers')
    } catch (err){
      console.log(err)
      alert('choose a unique username')
    }
  }


  render(){
    return(
      <div>
        <Input
          placeholder="Company Name"
          onChange={e => this.handleInput('companyName', e.target.value)}
        /> <br/>
        <Input
          placeholder="Business Type"
          onChange={e => this.handleInput('businessType', e.target.value)}
        /> <br/>
        <Input
          placeholder="Admin Username"
          onChange={e => this.handleInput('username', e.target.value)}
        /> <br/>
        <Input
          type='password'
          placeholder="Admin Password"
          onChange={e => this.handleInput('password', e.target.value)}
        /> <br/>
        <Button onClick={this.register}>Register</Button>
       
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return{
    companyId: reduxState.companyId,
    username: reduxState.username,
    companyName: reduxState.companyName,
    businessType: reduxState.businessType
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPartner)