var React = require('react');
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Link } from 'react-router-dom';



export default class Document extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      alignment: ''};

    this.onChange = (editorState) => {
      this.setState({editorState});
    };
    this.styleMap = {
      'COLOR': {color: 'red'},
      'FONT': {fontSize: 30}
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

  _onLeftIndentClick() {
    this.setState({alignment: 'left'});
  }

  _onCenterIndentClick() {
    this.setState({alignment: 'center'});

  }

  _onRightIndentClick() {
    this.setState({alignment: 'right'});
  }

  render() {
    return (
    <div>
       <div>
        <div id="navigation">
          <button><Link to='/login'>This is the login</Link></button>
          <button>Back to Documents Portal</button>
          <h1>Sample Document</h1>
          <h4>Document ID: _replace_this_please_ </h4>
          <button>Save Changes</button>
        </div>
        <div id="content">
          <button onClick={this._onLeftIndentClick.bind(this)}>Left</button>
          <button onClick={this._onCenterIndentClick.bind(this)}>Center</button>
          <button onClick={this._onRightIndentClick.bind(this)}>Right</button>
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
              spellCheck={true}
              textAlignment={this.state.alignment}
            />
          </div>
        </div>
      </div>
    </div>
    );
  }
}
