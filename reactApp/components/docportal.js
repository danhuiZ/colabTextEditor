import React from 'react';
import smalltalk from 'smalltalk/legacy';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
    //update with material modal
    var self = this;
    var title = this.state.docID;
    smalltalk.prompt("Create Document", "Please enter a password for " + title + ': ')
    .then(function(password){
      //console.log('PASSWORD', password);
      axios.post('http://localhost:3000/newdoc', {
        title: title,
        password: password
      })
      .then(function({ data }){
        if(data.success) {
          //add new doc to mydocs
          var newMyDocs = self.state.myDocs.concat(data.document);
          self.setState({
            myDocs: newMyDocs
          });
          self.props.history.push(`/documents/${data.document._id}`);
        }else{
          console.log('failure making doc. redirect back to doc portal');
        }
      });
    });
    self.setState({
      docID: ''
    });
  }

  handleSharedDocChange(event) {
    this.setState({
      sharedDocID: event.target.value
    });
  }

  handleSharedDocSubmit() {
    var sharedDocID = this.state.sharedDocID;
    this.setState({
        sharedDocID: ''
    });
    var self = this;
    // ask for password
    smalltalk.prompt("Collaborate on a Document", "Please enter the password for document: " + sharedDocID)
    .then( function(password) {
      // post to route in Backend
      axios.post('http://localhost:3000/search-shared', {
        docID: sharedDocID,
        password: password
      })
      .then( function({ data }) {
        // process response and either stay on doc portal with the proper alert or redirect to populated document page
        if(data.success === true){
            self.props.history.push(`/documents/${sharedDocID}`);
        }else if(data.message === 'Invalid DocID'){
            smalltalk.alert('TRY AGAIN', 'Invalid DocID')
            .then( function() {
              console.log('okie');
            })
        }else if(data.message === 'Incorrect password'){
            smalltalk.alert('TRY AGAIN', 'Invalid Password')
            .then( function() {
              console.log('okie2');
            })
        }
      })
    });
  }


  componentWillMount() {
    //load all the documents into the state of this component under myDocs
    var self = this;

    axios.get('http://localhost:3000/getdocs')
    .then(function({ data }){
      if(data.success) {
        self.setState({
          myDocs: data.found_docs
        });
      }
    });
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

            {this.state.myDocs.map( doc => {
              return <li key={doc._id}><Link to={`/documents/${doc._id}`}>{doc.title}</Link></li>;
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
