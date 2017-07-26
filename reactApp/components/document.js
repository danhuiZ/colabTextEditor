import React from 'react';
import { Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertToRaw,
  convertFromRaw
 } from 'draft-js';
import * as colors from 'material-ui/styles/colors';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import Dialog from 'material-ui/Dialog';
import { TwitterPicker } from 'react-color';
import { Map } from 'immutable';
import Toggle from 'material-ui/Toggle';


const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
  center: {
    wrapper: <div className="center-align" />
  },
  right: {
    wrapper: <div className="right-align" />
  }
}));


class Document extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: EditorState.createEmpty(),
      inlineStyles: {},
      fontSize: 12,
      openColorPicker: false,
      openHighlighter: false,
      open: false,
    };
    this.onChange = (editorState) => {
      this.setState({editorState});
    };
  }

  componentWillMount() {
    var self = this;
    axios.post('http://localhost:3000/retrieval', {
      docID: self.props.match.params.docID
    })
    .then(function({ data }) {
      if(data.editorState) {
        var content = JSON.parse(data.editorState);
        var newInlineStyles = Object.assign({}, self.state.inlineStyles);
        content.blocks.forEach(function(block) {
          block.inlineStyleRanges.forEach(function(i) {
            if (i.style.startsWith('#')) {
              newInlineStyles[i.style] = {
                color: i.style
              };
            } else if (i.style.startsWith('highlight')) {
              newInlineStyles[i.style] = {
                backgroundColor: i.style.substring(9, 17)
              };
            }
          });
        });
        self.setState({
          editorState: EditorState.createWithContent(convertFromRaw(content)),
          title: data.title,
          inlineStyles: newInlineStyles
        });
      } else {
        self.setState({
          title: data.title
        });
      }
    });
  }

  formatColor(color) {
    console.log('COLOR IS', color);
    var newInlineStyles = Object.assign({}, this.state.inlineStyles,
      {[color.hex]: {
        color: color.hex,
      }}
    );
    this.setState({
      inlineStyles: newInlineStyles,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, color.hex),
      openColorPicker: false
    });
  }

  highlightText(color) {
    var newInlineStyles = Object.assign({}, this.state.inlineStyles,
      {['highlight' + color.hex]: {
        backgroundColor: color.hex,
      }}
    );
    this.setState({
      inlineStyles: newInlineStyles,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, String('highlight' + color.hex)),
      openHighlighter: false
    });
    console.log("INLINESTYLES", this.state.inlineStyles);
  }

  toggleFormat(e, style, block) {
    e.preventDefault();      //prevent the editor from losing focus, can also use ref
    console.log("STYLE", style);
    if(block) {
      console.log("REACHED here");
      this.setState({
        editorState: RichUtils.toggleBlockType(
          this.state.editorState, style
        )
      });
    } else {
      this.setState({
        editorState: RichUtils.toggleInlineStyle(
          this.state.editorState, style
        )
      });
    }
  }

  formatButton({icon, style, block}) {
    return (
      <FlatButton
        backgroundColor={
          this.state.editorState.getCurrentInlineStyle().has(style) ?
          colors.blue800 :
          colors.blue200
        }
        onMouseDown={(e) => this.toggleFormat(e, style, block)}
        icon={<FontIcon className='material-icons'>{icon}</FontIcon>}
      />
    );
  }

  handleChangeComplete() {
    this.setState({
      openColorPicker: false
    });
  }

  openColorPicker(e) {
    this.setState({
      openColorPicker: true,
      colorPickerButton: e.target
    });
  }

  closeColorPicker() {
    this.setState({
      openColorPicker: false,
    });
  }

  colorPicker() {
    return (
      <div style={{display: 'inline-block'}}>
        <FlatButton
          backgroundColor={colors.blue200}
          icon={<FontIcon className='material-icons'>format_color_fill</FontIcon>}
          onClick={this.openColorPicker.bind(this)}
        />
        <Popover
          open={this.state.openColorPicker}
          anchorEl={this.state.colorPickerButton}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.closeColorPicker.bind(this)}
        >
          <TwitterPicker onChangeComplete={this.formatColor.bind(this)}/>
        </Popover>
      </div>
    );
  }

  openHighlighter(e) {
    this.setState({
      openHighlighter: true,
      highlighterButton: e.target
    });
  }

  closeHighlighter() {
    this.setState({
      openHighlighter: false,
    });
  }

  highlighter() {
    return (
      <div style={{display: 'inline-block'}}>
        <FlatButton
          backgroundColor={colors.blue200}
          icon={<FontIcon className='material-icons'>highlight</FontIcon>}
          onClick={this.openHighlighter.bind(this)}
        />
        <Popover
          open={this.state.openHighlighter}
          anchorEl={this.state.highlighterButton}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.closeHighlighter.bind(this)}
        >
          <TwitterPicker onChangeComplete={this.highlightText.bind(this)}/>
        </Popover>
      </div>
    );
  }

  applyIncreaseFontSize(shrink) {
    var newFontSize = this.state.fontSize + (shrink ? -4 : 4);
    var newInlineStyles = Object.assign({}, this.state.inlineStyles,
      {[newFontSize]: {
        fontSize: `${newFontSize}px`
      }}
    );
    this.setState({
      inlineStyles: newInlineStyles,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, String(newFontSize)),
      fontSize: newFontSize
    });
  }

  increaseFontSize(shrink) {
    return (
      <FlatButton
        backgroundColor={colors.blue200}
        onMouseDown={() => this.applyIncreaseFontSize(shrink)}
        icon={<FontIcon className='material-icons'>{shrink ? 'zoom_out' : 'zoom_in'}</FontIcon>}
      />
    );
  }

  saveReminder() {
    var self = this;

    axios.post('http://localhost:3000/retrieval', {
      docID: self.props.match.params.docID
    })
    .then(function({ data }) {
      if(JSON.stringify(convertFromRaw(JSON.parse(data.editorState))) !== JSON.stringify(self.state.editorState.getCurrentContent())) {
        self.setState({open: true});
      } else {
        self.props.history.push('/doc-portal');
      }
    });
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
     });
  }

  _handleDiscard() {
    this.setState({open: false});
    this.props.history.push('/doc-portal');
  }

  _handleSave() {
    this.setState({open: false});
    this._onSaveClick();
    this.props.history.push('/doc-portal');
  }

  render() {
    console.log('INLINE STYLES', this.state.inlineStyles);
    const actions = [
      <FlatButton
        label="Discard Changes"
        primary={true}
        onTouchTap={() => this._handleDiscard()}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={() => this._handleSave()}
      />,
    ];
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div className="navigation">
          <a className="docID">{`Document ID: ${this.props.match.params.docID}`}</a>
          <br></br>
          <Toggle
            label="Enable Auto-saving"
            labelPosition="right"
            style={{"margin-top": "10px"}}
           />
          <Link to='/doc-portal'>
            <FlatButton
              className="button"
              label="Back to Documents Portal"
              icon={<FontIcon className='material-icons'>navigate_before</FontIcon>}
            />
          </Link>
          <FlatButton
            className="button"
            label="Save Changes"
            icon={<FontIcon className='material-icons'>save</FontIcon>}
            onTouchTap={this.saveReminder.bind(this)}
          />
          <Dialog
            title="Do you want save?"
            actions={actions}
            modal={true}
            open={this.state.open}
          />
        </div>
        <div className="toolbar">
          {this.colorPicker()}
          {this.formatButton({icon: 'format_bold', style: 'BOLD'})}
          {this.formatButton({icon: 'format_italic', style: 'ITALIC'})}
          {this.formatButton({icon: 'format_underlined', style: 'UNDERLINE'})}
          {this.formatButton({icon: 'format_strikethrough', style: 'STRIKETHROUGH'})}
          {this.highlighter()}
          {this.formatButton({icon: 'format_list_numbered', style: 'ordered-list-item', block: true })}
          {this.formatButton({icon: 'format_list_bulleted', style: 'unordered-list-item', block: true })}
          {this.formatButton({icon: 'format_align_left', style: 'unstyled', block: true })}
          {this.formatButton({icon: 'format_align_center', style: 'center', block: true })}
          {this.formatButton({icon: 'format_align_right', style: 'right', block: true })}
          {this.increaseFontSize(false)}
          {this.increaseFontSize(true)}
        </div>
        <div className="container">
          <Editor
            ref="editor"
            blockRenderMap={myBlockTypes}
            customStyleMap={this.state.inlineStyles}
            editorState={this.state.editorState}
            onChange={this.onChange}
            spellCheck={true}
          />
      </div>
    </div>
    );
  }
}

export default Document;
