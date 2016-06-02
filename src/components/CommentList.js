'use strict'

import React, { PropTypes } from 'react';
import Comment from './Comment';

// stateless component
const CommentList = (props) => {
  const commentNodes = props.data.map((comment, i) => {
    return (
      <Comment author={comment.author} key={i} createdAt={comment.createdAt} id={comment.id} files={comment.files} onCommentDelete={props.onCommentDelete}>
        {comment.text}
      </Comment>
    )
  })

  return (
    <div className='comment-list'>
      {commentNodes}
    </div>
  )
}

CommentList.propTypes = {
  data: PropTypes.array.isRequired,
  onCommentDelete: PropTypes.func.isRequired
}

export default CommentList
