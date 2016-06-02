import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import marked from 'marked';

require("./style/Application.scss");

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  handleDelete: function(e) {
    e.preventDefault();
    this.props.onCommentDelete({id: this.props.id});
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <span className="date">{this.props.createdAt}</span>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.props.url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE ) {
        if(xhr.status == 200) {
          var data = JSON.parse(xhr.responseText);
          this.setState( { data: data } );
        } else if(xhr.status == 400) {
          // alert('There was an error 400');
        } else {
          // alert('something else other than 200 was returned');
        }
      }
    }.bind(this);
    xhr.send();
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.id = Date.now().toString();
    comment.createdAt = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.props.url, true);
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE ) {
        if(xhr.status == 200) {
          this.loadCommentsFromServer();
        } else if (xhr.status == 400) {
          // alert('There was an error 400');
        } else {
          // alert('something else other than 200 was returned');
        }
      }
    }.bind(this);
    xhr.send(JSON.stringify(comment));
  },
  handleCommentDelete: function(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', this.props.url, true);
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE ) {
        if(xhr.status == 200) {
          this.loadCommentsFromServer();
        } else if (xhr.status == 400) {
          // alert('There was an error 400');
        } else {
          // alert('something else other than 200 was returned');
        }
      }
    }.bind(this);
    xhr.send(JSON.stringify(id));
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1 className="shit">Comments yo!!!</h1>
        <CommentList onCommentDelete={this.handleCommentDelete} data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id} createdAt={comment.createdAt} id={comment.id} onCommentDelete={this.props.onCommentDelete}>
          {comment.text}
        </Comment>
      );
    }.bind(this));
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
