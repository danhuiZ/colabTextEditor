var React = require('React');


export default class NewDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docID: '',
    };
  }

  handleChange(event) {
    this.setState({
      docID: event.target.value
    });
  }

  handleSubmit() {
    alert('A new document was submitted: ' + this.state.docID);
    event.preventDefault();
    this.setState({
      docID: ''
    })
  }


  render() {
    return(
      <div>
        <input type="text" value={this.state.docID} onChange={(event) => this.handleChange(event)} placeholder="New Document Title"/>
        <button onClick={() => this.handleSubmit()}>Create Document</button>
      </div>
    );
  }

}
