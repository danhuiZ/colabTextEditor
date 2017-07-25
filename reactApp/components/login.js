var React = require('React');


export default class Login extends React.Component {
  render() {
    return(
      <div>
      <h1>LOGIN!</h1>
      <form method="POST" action="/login">
        <input placeholder="Enter a username..." id="username"></input>
        <br></br>
        <input placeholder="Enter a password..." id="password"></input>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>

      </div>
    );
  }

}
