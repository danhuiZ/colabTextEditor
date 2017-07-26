import React from 'react';
import smalltalk from 'smalltalk/legacy';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as colors from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';


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
        } else if (data.message === 'Invalid DocID') {
          smalltalk.alert('TRY AGAIN', 'Invalid DocID')
            .then( function() {
              console.log('okie');
            });
        }else if(data.message === 'Incorrect password'){
          smalltalk.alert('TRY AGAIN', 'Invalid Password')
            .then( function() {
              console.log('okie2');
            });
        }
      });
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
      <div className="docportal">
        <div className = "my-docs">
          {/* <h4>My Documents</h4> */}
          <List>
            <Subheader inset={true}>My Documents</Subheader>
            {this.state.myDocs.map( doc => {
              return (<ListItem
                style={{"width": "40%"}}
                leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={colors.blue500} />}
                containerElement={<Link to={`/documents/${doc._id}`}></Link>}
                primaryText={doc.title}
                key={doc._id}
              />);
            })}
          </List>
        </div>
        <div className = "new-doc">
          <TextField
            floatingLabelText="New Document Title"
            type="text"
            style={{'boxShadow': 'none'}}
            value={this.state.docID}
            onChange={(event) => this.handleNewDocChange(event)}
          />
          <br></br>
          <RaisedButton
            label="Create Document"
            onTouchTap={() => this.handleNewDocSubmit()}
          />
        </div>
        <div className = "shared-doc">
          <TextField
            floatingLabelText="paste a doc ID shared with you"
            type="text"
            value={this.state.sharedDocID}
            onChange={(event) => this.handleSharedDocChange(event)}
          />
          <br></br>
          <RaisedButton
            label="Search for Shared Doc"
            onTouchTap={() => this.handleSharedDocSubmit()}
          />
          {/* <input type="text" value={this.state.sharedDocID} onChange={(event) => this.handleSharedDocChange(event)} placeholder="paste a doc ID shared with you"/>
          <button onClick={() => this.handleSharedDocSubmit()}>Search for Shared Doc</button> */}
        </div>
        <div className="logout">
          <Link to='/'>
            <FlatButton
              className="button"
              label="Log out"
              icon={<FontIcon className='material-icons'>account_circle</FontIcon>}
            />
          </Link>
        </div>
      </div>
    );
  }

}
