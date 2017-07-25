import React from 'react';
import axios from 'axios';

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
    .then(function(resp) {
      console.log('We got a response!', resp);
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
        <button onClick={() => this.handleSubmit()}></button>
      </div>
    );
  }

}

export default Login;
