var React = require('react');
var ReactDOM = require('react-dom');
import {Editor, EditorState} from 'draft-js';


/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    return (
      <div id="content">
        <h1>Draft.js Editor</h1>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}




ReactDOM.render(<Document />,
   document.getElementById('root'));
