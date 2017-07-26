var React = require('react');


export default class NewDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDocID: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.newDocID});
  }

  handleSubmit(event) {
    alert('A new document was submitted: ' + this.state.newDocID);
    event.preventDefault();
  }


  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.newDocID} onChange={this.handleChange} placeholder="new document title"/>
        <input type="submit" value="Create Document" />
      </form>
    );
  }

}
