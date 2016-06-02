'use strict'

import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import ReactIntl from 'react-intl';
import moment from 'moment';

class Comment extends Component {

  rawMarkup () {
    const rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  }

  constructor(props) {
    super(props);

    this.state = {
      date: moment(this.props.createdAt).locale('ru').format('LLL')
    };
  }

  handleDelete (e) {
    e.preventDefault();
    this.props.onCommentDelete({id: this.props.id});
  }

  render () {
    return (
      <div className='comment'>
        <h2 className='comment-author'>{this.props.author}</h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <span className="date">{this.state.date}</span>
        <button onClick={this.handleDelete.bind(this)}>Delete</button>
      </div>
    )
  }
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.any.isRequired,
  date: PropTypes.any,
  files: PropTypes.any,
  onCommentDelete: PropTypes.func.isRequired,
  children: PropTypes.string
}

export default Comment;
