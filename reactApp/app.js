var React = require('react');
var ReactDOM = require('react-dom');
import { Editor, EditorState, RichUtils } from 'draft-js';
// import { TwitterPicker } from 'react-color';
// import { Collapse } from 'react-collapse';


/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = (editorState) => {
      this.setState({editorState});
    };
    this.styleMap = {
      'COLOR': {color: 'red'},
      'FONT': {fontSize: 20}
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

  onColorClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'COLOR'
    ));
  }

  onFontClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'FONT'
    ));
  }


  render() {
    return (
      <div>
        <div id="navigation">
          <button>Back to Documents Portal</button>
          <h1>Sample Document</h1>
          <h4>Document ID: _replace_this_please_ </h4>
          <button>Save Changes</button>
        </div>
        <div id="content">
          <button onClick={this._onBoldClick.bind(this)}>Bold</button>
          <button onClick={this._onItalicClick.bind(this)}>Italic</button>
          <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
          <button onClick={this._onCodeClick.bind(this)}>Code</button>
          <button onClick={this.onColorClick.bind(this)}>Font Color</button>
          <button onClick={this.onFontClick.bind(this)}>Font Size</button>
          <button onClick={this._onBulletedClick.bind(this)}>Bulleted List</button>
          <button onClick={this._onNumberedClick.bind(this)}>Numbered List</button>
          <div className="editor">
            <Editor
              customStyleMap={this.styleMap}
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Document />,
   document.getElementById('root'));
