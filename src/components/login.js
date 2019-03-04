import React, {Component} from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }
  render(){
    return(
      <div>
        Login <br/>
        <Input 
          placeholder="Username" 
        /> <br/>
        <Input
          placeholder="Password" 
        /> <br/> <br/>
        <Button variant='contained' size='small' color='primary'>
          Submit
        </Button>
      </div>
    )
  }
}

export default (Login)