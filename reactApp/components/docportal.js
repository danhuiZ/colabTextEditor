var React = require('React');

export default class DocPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myDocs: [],
      docID: '',
      sharedDocID: ''
    };
  }

  handleNewDocChange(event) {
    this.setState({
      docID: event.target.value
    });
  }

  handleNewDocSubmit() {
    alert('A new document was submitted: ' + this.state.docID);
    event.preventDefault();
    this.setState({
      docID: ''
    })
  }

  handleSharedDocChange(event) {
    this.setState({
      sharedDocID: event.target.value
    });
  }

  handleSharedDocSubmit() {
    event.preventDefault();
    alert('Searching for this shared document and then ask for password to access: ' + this.state.sharedDocID);
    this.setState({
        sharedDocID: ''
    })
  }

  render() {
    return(
      <div>
        <div className = "new-doc">
          <input type="text" value={this.state.docID} onChange={(event) => this.handleNewDocChange(event)} placeholder="New Document Title"/>
          <button onClick={() => this.handleNewDocSubmit()}>Create Document</button>
        </div>

        <div className = "my-docs">
          <h4>My Documents</h4>
          <ul>
            {this.state.myDocs.map(doc => {
              return <li key={doc._id}><a href={'/docs/'+doc._id}>{doc.title}</a></li>
            })}
          </ul>
        </div>

        <div className = "shared-doc">
          <input type="text" value={this.state.sharedDocID} onChange={(event) => this.handleSharedDocChange(event)} placeholder="paste a doc ID shared with you"/>
          <button onClick={() => this.handleSharedDocSubmit()}>Search for Shared Doc</button>
        </div>
      </div>
    );
  }

}
