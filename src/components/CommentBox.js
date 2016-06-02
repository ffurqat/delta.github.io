/* global fetch */
'use strict'

import React, { Component, PropTypes } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

import marked from 'marked';

require("../style/Application.scss");

class CommentBox extends Component {

  constructor (props) {
    super(props)
    this.state = { data: [] }
  }

  loadComments () {
    fetch(this.props.url)
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount () {
    this.loadComments()
    setInterval(() => this.loadComments(), this.props.pollInterval)
  }

  handleCommentSubmit (comment) {
    const comments = this.state.data
    const newComments = comments.concat([ comment ])
    comment.createdAt = Date.now();

    this.setState({ data: newComments })

    fetch(this.props.url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(data => this.setState({ data: this.state.data }))
    .catch(err => console.error(this.props.url, err.toString()))
  }

  handleCommentDelete (id) {
    fetch(this.props.url, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    })
    .then(response => response.json())
    .then(data => this.setState({ data: this.state.data }))
    .catch(err => console.error(this.props.url, err.toString()))
  }

  render () {
    return (
      <div className='comment-box'>
        <h1>Comments</h1>
        <CommentList onCommentDelete={this.handleCommentDelete.bind(this)} data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    )
  }
}

CommentBox.propTypes = {
  url: PropTypes.string.isRequired,
  pollInterval: PropTypes.number.isRequired
}

export default CommentBox;
