var React = require('react');


export default class AddSharedDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addSharedDocID: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({addSharedDocID: event.target.value});
  }

  handleSubmit(event) {
    alert('An existing shared document was submitted: ' + this.state.addSharedDocID);
    event.preventDefault();
  }


  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.addSharedDocID} onChange={this.handleChange} placeholder="paste a doc ID shared with you"/>
        <input type="submit" value="Add Shared Document" />
      </form>
    );
  }

}
