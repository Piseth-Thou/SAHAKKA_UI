import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import sanitizeHtml from 'sanitize-html'
import './styles.css'
import TextArea from 'antd/lib/input/TextArea';

export default class MyEditor extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      dataHtml: '',
      dataArr: []
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      dataHtml: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }, () => {
      this.splitContent()
    });

  };
  splitContent = () => {
    const content = this.state.dataHtml
    var dataSlipt = content.split(/\n/)
    this.setState({
      dataArr: [...dataSlipt]
    })
  }

  cleanHtmlString = (html) => {
    var clean = sanitizeHtml(html, {
      allowedTags: ['br', 'div'],
    });
    var cleanHtml = clean.replace(/<br \/>/g, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

    return cleanHtml
  }

  render() {
    return (
      <div>
        <div style={{ width: "100%", margin: "auto" }}>
          <Editor
          placeholder=''
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>
      </div>
    );
  }
}

