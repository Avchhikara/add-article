import React from "react";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Editor.style.scss";

class DEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange = value => {
    this.setState({ editorState: value });

    // Updating the global state with if need
    const { updateData } = this.props;
    // console.log(updateData);
    if (updateData) {
      setTimeout(() => {
        // Getting the html version of the state
        const rawContentState = convertToRaw(
          this.state.editorState.getCurrentContent()
        );
        const markup = draftToHtml(rawContentState);
        // console.log("Markup -> ", markup);
        updateData(markup);
      });
    }
  };

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }
}

export default DEditor;
