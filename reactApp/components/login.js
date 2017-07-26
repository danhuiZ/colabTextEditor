import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


// or change it to axios request

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      username: '',
      password: '',
      status: ''
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
    var self = this;
    axios.post('http://localhost:3000/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function({ data }) {
      if(data.success) {
        self.props.history.push('/docportal');
      } else {
        self.setState({status: 'There was a problem with logging in!'});
      }
    });
  }

  render() {
    return(
      <div>
        <h1>Login!</h1>
        <p style={{color: 'red'}}>{this.state.status}</p>
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
