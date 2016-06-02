'use strict'

import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import ImageList from './ImageList';

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = { author: '', text: '', files: [] };
  }

  onDrop (files) {
    const droppedFiles = this.state.files
    const newFiles = droppedFiles.concat(files)

    this.setState({
      files: newFiles
    });

    console.log(this.state);
  }

  renderImages () {
    return this.state.files.map((file, i) => {
      return (
        <li key = { i } id = { i } >
          <img src={file.preview} />
          <input type='text' placeholder='Image caption' ref='caption' />
          <button onClick={this.handleImageDelete.bind(this)}>Delete</button>
        </li>
      );
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    const author = this.refs.author.value.trim();
    const text = this.refs.text.value.trim();

    if (!text || !author) {
      return
    }

    this.props.onCommentSubmit({ author: author, text: text });
    this.refs.author.value = '';
    this.refs.text.value = '';
    return
  }

  handleImageDelete (e, id) {
    e.preventDefault();
    this.state.files.splice(id, 1);
    console.log(this.props)

    return
  }

  render () {
    return (
      <form className='comment-form' onSubmit={this.handleSubmit.bind(this)}>
        <input type='text' placeholder='Your name' ref='author' />
        <input type='text' placeholder='Say something...' ref='text' />
        <Dropzone ref="dropzone" multiple={true} onDrop={this.onDrop.bind(this)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <ImageList files={ this.state.files }/>
        <input type='submit' value='Post' />
      </form>
    )
  }
}

CommentForm.propTypes = {
  onCommentSubmit: PropTypes.func.isRequired
}

export default CommentForm;
