'use strict'

import React, { Component, PropTypes } from 'react';

class ImagesList extends Component {
  renderImages () {
    return this.props.files.map((file, i) => {
      return (
        <li key = { i } onClick={this.handleImageDelete.bind(this, i, this.props)}>
          <img src={file.preview} />
          <input type='text' placeholder='Image caption' ref='caption' />
          <button onClick={this.handleImageDelete.bind(this, i, this.props)}>Delete</button>
        </li>
      );
    });
  }

  handleImageDelete (i, props) {
    console.log(this.props.files[i]);
    this.props.files.splice(i, 1);

    return
  }

  render () {
    return (
      <ul className='image-list'>
        {this.renderImages()}
      </ul>
    )
  }
}

ImagesList.propTypes = {
  files: PropTypes.array.isRequired
}

export default ImagesList;
