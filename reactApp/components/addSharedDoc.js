var React = require('React');

export default class AddSharedDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedDocID: '',
    };
  }

  handleChange(event) {
    this.setState({
      sharedDocID: event.target.value
    });
  }

  handleSubmit() {
    event.preventDefault();
    alert('Searching for this shared document and then ask for password to access: ' + this.state.sharedDocID);
    this.setState({
        sharedDocID: ''
    })
  }

  render() {
    return(
      <div>
        <input type="text" value={this.state.sharedDocID} onChange={(event) => this.handleChange(event)} placeholder="paste a doc ID shared with you"/>
        <button onClick={() => this.handleSubmit()}>Search for Shared Doc</button>
      </div>
    );
  }
}
