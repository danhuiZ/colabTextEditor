import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


// or change it to axios request

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      username: '',
      password: ''
    };
    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUser(e) {
    this.setState({username: e.target.value});
  }

  handlePass(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit() {
    axios.post('http://localhost:3000/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function({ data }) {
      if(data.success) {
        console.log('The user should be taken to documents page');
      } else {
        console.log('The user should be asked to login again');
      }

    });
  }

  render() {
    return(
      <div>
        <h1>LOGIN!</h1>
        <input name="username" placeholder="Enter a username..." value={this.state.username} onChange={(e) => this.handleUser(e)} id="username"></input>
        <br></br>
        <input name="password" placeholder="Enter a password..." value={this.state.password} onChange={(e) => this.handlePass(e)} id="password"></input>
        <br></br>
        <button onClick={() => this.handleSubmit()}>Submit</button>
        <button><Link to='/registration'>This is the registration</Link></button>
      </div>
    );
  }

}

export default Login;
