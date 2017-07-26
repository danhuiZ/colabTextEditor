var React = require('React');


// or change it to axios request

class Registration extends React.Component {
  render() {
    return(
      <div>
      <h1>Registrater!</h1>
      <form method="POST" action="http://localhost:3000/register">
        <input name="username" placeholder="Enter a username..." id="username"></input>
        <br></br>
        <input name="password" placeholder="Enter a password..." id="password"></input>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>

      </div>
    );
  }

}

export default Registration;
