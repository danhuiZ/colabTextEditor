import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// require('../img');
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
    // e.preventDefault();
    var self = this;
    axios.post('http://localhost:3000/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function({ data }) {
      console.log('This log should contain the data', data);
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

      <Card className="card">
          <CardMedia
            // overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
          >
            <img src='img/chatbot.png' />
          </CardMedia>
          <CardTitle title="Login with us" subtitle="the document management tool that you deserve"/>
          <CardText>
            <p style={{color: 'red'}}>{this.state.status}</p>
            <TextField
              floatingLabelText="Username"
              type="text"
              style={{'boxShadow': 'none'}}
              value={this.state.username}
              onChange={(event) => this.handleUser(event)}
            />
            <TextField
              floatingLabelText="Password"
              type="password"
              style={{'boxShadow': 'none', 'clear': 'both'}}
              value={this.state.password}
              onChange={(event) => this.handlePass(event)}
            />
          </CardText>
          <CardActions>
            <RaisedButton
              label="To Registration"
              containerElement={<Link to='/registration'></Link>}
            />
            <RaisedButton
              label="Login"
              primary={true}
              onTouchTap={() => this.handleSubmit()}
            />
          </CardActions>
        </Card>

      // <div className="valign-wrapper row login-box">
      //   <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
      //     <form>
      //       <div className="card-content">
      //         <span className="card-title">Log in with DAM docs, damn</span>
      //         <div className="row">
      //           <p style={{color: 'red'}}>{this.state.status}</p>
      //           <div className="input-field col s12">
      //             <input
      //               type="text"
      //               placeholder="Username"
      //               className="validate"
      //               name="username"
      //               value={this.state.username}
      //               onChange={(e) => this.handleUser(e)}
      //               id="username" />
      //           </div>
      //           <div className="input-field col s12">
      //             <input
      //               type="password"
      //               placeholder="Password"
      //               className="validate"
      //               name="password"
      //               value={this.state.password}
      //               onChange={(e) => this.handlePass(e)}
      //               id="password" />
      //           </div>
      //         </div>
      //       </div>
      //       <div className="card-action right-align">
      //         <Link to='/registration'>To Registration</Link>
      //         <input
      //           type="submit"
      //           className="btn green waves-effect waves-light"
      //           onClick={(e) => this.handleSubmit(e)}
      //           value="Login" />
      //       </div>
      //     </form>
      //   </div>
      // </div>
    );
  }

}

export default Login;
