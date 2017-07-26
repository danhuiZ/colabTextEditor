import React from 'react';
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js';
// import { Link } from 'react-router-dom';
import * as colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
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
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      inlineStyles: {}
    };
    this.onChange = (editorState) => {
      this.setState({editorState});
    };
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
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, color.hex)
    });
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
      <RaisedButton
        backgroundColor={
          this.state.editorState.getCurrentInlineStyle().has(style) ?
          colors.red800 :
          colors.red200
        }
        onMouseDown={(e) => this.toggleFormat(e, style, block)}
        icon={<FontIcon className='material-icons'>{icon}</FontIcon>}
      />
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
  colorPicker() {
    return (
      <div style={{display: 'inline-block'}}>
        <RaisedButton
          backgroundColor={colors.red200}
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


  render() {
    return (
    <div>
        <h1>Sample Document</h1>
        <div id="navigation">
          <RaisedButton
            className="button"
            // primary={true}
            label="Back to Documents Portal"
            icon={<FontIcon className='material-icons'>navigate_before</FontIcon>}
          />
          <RaisedButton
            className="button"
            // primary={true}
            label="Save Changes"
            icon={<FontIcon className='material-icons'>save</FontIcon>}
          />
          <a className="docID">Document ID: _replace_this_please_ </a>
        </div>
        <div className="toolbar">
          {this.formatButton({icon: 'format_bold', style: 'BOLD'})}
          {this.formatButton({icon: 'format_italic', style: 'ITALIC'})}
          {this.formatButton({icon: 'format_underlined', style: 'UNDERLINE'})}
          {this.formatButton({icon: 'format_strikethrough', style: 'STRIKETHROUGH'})}
          {this.formatButton({icon: 'format_list_numbered', style: 'ordered-list-item', block: true })}
          {this.formatButton({icon: 'format_list_bulleted', style: 'unordered-list-item', block: true })}
          {this.colorPicker()}
          {this.formatButton({icon: 'format_align_left', style: 'unstyled', block: true })}
          {this.formatButton({icon: 'format_align_center', style: 'center', block: true })}
          {this.formatButton({icon: 'format_align_right', style: 'right', block: true })}
        </div>
        <Editor
          ref="editor"
          blockRenderMap={myBlockTypes}
          customStyleMap={this.state.inlineStyles}
          editorState={this.state.editorState}
          onChange={this.onChange}
          spellCheck={true}
        />
    </div>
    );
  }
}

export default Document;
