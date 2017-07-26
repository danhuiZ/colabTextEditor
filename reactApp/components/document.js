import React from 'react';
import { Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertToRaw,
  convertFromRaw
 } from 'draft-js';
import { Link } from 'react-router-dom';
import * as colors from 'material-ui/styles/colors';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import { TwitterPicker } from 'react-color';
import { Map } from 'immutable';

const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
  center: {
    wrapper: <div className="center-align" />
  },
  right: {
    wrapper: <div className="right-align" />
  }
}));

class Document extends React.Component {

  //TODO:  , numbers, bullet, left, center, right, increase font, decrease font

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: EditorState.createEmpty(),
      inlineStyles: {},
      fontSize: 12,
      openColorPicker: false,
      openHighlighter: false,
      colorPickerButton: null
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
        self.setState({
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(data.editorState))),
          title: data.title
        });
      } else {
        self.setState({
          title: data.title
        });
      }
    });
  }

// TEXT COLOR PICKER
  // renders a color picker button
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
          <TwitterPicker onChangeComplete={this.textColor.bind(this)}/>
        </Popover>
      </div>
    );
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

  textColor(color) {
    console.log('BOLOR IS', color);
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

// HIGHLIGHT COLOR PICKER
  // renders a highlight picker button
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
          <TwitterPicker onChangeComplete={this.highlightColor.bind(this)}/>
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

  highlightColor(color) {
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

// NEXT THING

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

  render() {
    return (
      <div className="WRAPPER">

          <div>
            <h1>{this.state.title}</h1>
            <a className="docID">{`Document ID: ${this.props.match.params.docID}`}</a>
          </div>

          <div className="navigation">

            <div className="back-docportal">
              <Link to='/doc-portal'>
                <FlatButton
                  className="button"
                  label="Back to Documents Portal"
                  icon={<FontIcon className='material-icons'>navigate_before</FontIcon>}
                />
              </Link>
            </div>

            <div className="save">
              <FlatButton
                className="button"
                label="Save Changes"
                icon={<FontIcon className='material-icons'>save</FontIcon>}
                onTouchTap={this._onSaveClick.bind(this)}
              />
            </div>

          </div>

          <div className="toolbar1">
            <div className="toolbar-item">
              {this.formatButton({icon: 'format_bold', style: 'BOLD'})}
            </div>
            <div className="toolbar-item">
              {this.formatButton({icon: 'format_italic', style: 'ITALIC'})}
            </div>
            <div className="toolbar-item">
              {this.formatButton({icon: 'format_underlined', style: 'UNDERLINE'})}
            </div>
            <div className="toolbar-item">
              {this.formatButton({icon: 'format_strikethrough', style: 'STRIKETHROUGH'})}
            </div>
          </div>

          <div className="toolbar2">
            <div className="toolbar-item">
              {this.formatButton({icon: 'format_align_left', style: 'unstyled', block: true })}
            </div>
            <div className="toolbar-item">
              {this.formatButton({icon: 'format_align_center', style: 'center', block: true })}
            </div>
            <div className="toolbar-item">
              {this.formatButton({icon: 'format_align_right', style: 'right', block: true })}
            </div>
            <div className="toolbar-item">
              {this.formatButton({icon: 'format_list_numbered', style: 'ordered-list-item', block: true })}
            </div>
            <div className="toolbar-item">
              {this.formatButton({icon: 'format_list_bulleted', style: 'unordered-list-item', block: true })}
            </div>
          </div>

          <div className="toolbar3">
            <div className="toolbar-item">
              {this.colorPicker()}
            </div>
            <div className="toolbar-item">
              {this.increaseFontSize(false)}
            </div>
            <div className="toolbar-item">
              {this.increaseFontSize(true)}
            </div>
            <div className="toolbar-item">
              {this.highlighter()}
            </div>
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
        <div className="registration">
          <Link to='/'>
            <FlatButton
              className="button"
              label="To Login"
              icon={<FontIcon className='material-icons'>face</FontIcon>}
            />
          </Link>
          <Link to='/registration'>
            <FlatButton
              className="button"
              label="To Registration"
              icon={<FontIcon className='material-icons'>account_circle</FontIcon>}/>
          </Link>
        </div>
      </div>
    );
  }
}

export default Document;
