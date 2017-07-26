import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// or change it to axios request

class Registration extends React.Component {
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
    var self = this;
    axios.post('http://localhost:3000/register', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function({ data }) {
      if(data.success) {
        self.props.history.push('/');
      }
    })
    .catch(function(err) {
      console.log('There is a massive error :)', err);
    });
  }

  render() {
    return(
      <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <form>
            <div className="card-content">
              <span className="card-title">Register with us</span>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="text"
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
              <Link to='/'>To Login</Link>
              <input
                type="submit"
                className="btn green waves-effect waves-light"
                onClick={() => this.handleSubmit()}
                value="Register Now" />
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default Registration;
