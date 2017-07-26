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

    console.log('happy man');

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
        console.log('The user should be taken to documents page');
        self.props.history.push('/doc-portal');
      } else {
        self.setState({status: 'There was a problem with logging in!'});
      }
    });
  }

  render() {
    return(
      <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <form>
            <div className="card-content">
              <span className="card-title">Log in with DAM docs, damn</span>
              <div className="row">
                <p style={{color: 'red'}}>{this.state.status}</p>
                <div className="input-field col s12">
                  {/* <label for="username">Username</label> */}
                  <input
                    type="email"
                    placeholder="Username"
                    className="validate"
                    name="username"
                    value={this.state.username}
                    onChange={(e) => this.handleUser(e)}
                    id="username" />
                </div>
                <div className="input-field col s12">
                  {/* <label for="password">Password </label> */}
                  <input
                    type="password"
                    placeholder="Password"
                    className="validate"
                    name="password"
                    value={this.state.password}
                    onChange={(e) => this.handlePass(e)}
                    id="password" />
                </div>
              </div>
            </div>
            <div className="card-action right-align">
              <a><Link to='/registration'>Registration</Link></a>
              <input
                type="submit"
                className="btn green waves-effect waves-light"
                onClick={() => this.handleSubmit()}
                value="Login" />
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default Login;
