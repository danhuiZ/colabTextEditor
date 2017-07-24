var React = require('react');
var ReactDOM = require('react-dom');
import {Editor, EditorState, RichUtils} from 'draft-js';


/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      console.log(editorState);
      this.setState({editorState});
    };
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
  }

  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'ITALIC'
    ));
  }

  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'UNDERLINE'
    ));
  }

  _onCodeClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'CODE'
    ));
  }

  _onBulletedClick() {
    this.onChange(RichUtils.toggleBlockType(
            this.state.editorState,
            'unordered-list-item'
    ));
  }

  _onNumberedClick() {
    this.onChange(RichUtils.toggleBlockType(
            this.state.editorState,
            'ordered-list-item'
    ));
  }

  render() {
    return (
      <div id="content">
        <h1>Draft.js Editor</h1>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this._onItalicClick.bind(this)}>Italic</button>
        <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
        <button onClick={this._onCodeClick.bind(this)}>Code</button>
        <button onClick={this._onBulletedClick.bind(this)}>Bulleted List</button>
        <button onClick={this._onNumberedClick.bind(this)}>Numbered List</button>
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
