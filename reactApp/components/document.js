var React = require('react');
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Document extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      alignment: '',
      title: ''
    };

    this.onChange = (editorState) => {
      this.setState({editorState});
    };

    this.styleMap = {
      'COLOR': {color: 'red'},
      'FONT': {fontSize: 30}
    };
  }

  componentWillMount() {
    var self = this;

    axios.post('http://localhost:3000/retrieval', {
      docID: self.props.match.params.docID
    })
    .then(function({ data }) {
      if(data.editorState) {
        self.setState({
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(data.editorState))),
          title: data.title
        })
      } else {
        self.setState({
          title: data.title
        })
      }
    })
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



  _onSaveClick() {
    axios.post('http://localhost:3000/save', {
      docID: this.props.match.params.docID,
      editorState: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
    })
    .then(function(resp) {
      console.log('Document successfully saved!');
    })
    .catch(function(err) {
      console.log('There was an error', err);
    })
  }

  render() {
    return (
    <div>
       <div>
        <div id="navigation">
          <button><Link to='/login'>This is the login</Link></button>
          <button><Link to='/registration'>This is the registration</Link></button>
          <button><Link to='/doc-portal'>Back to Documents Portal</Link></button>
          <h1>{this.state.title}</h1>
          <h4>{`Document ID: ${this.props.match.params.docID}`}</h4>
          <button onClick={() => this._onSaveClick()}>Save Changes</button>
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
