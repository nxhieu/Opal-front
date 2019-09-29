import React, { Component } from "react";
import "../../dist/comment/comment.css";

class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <div className="row">
          <span>Comment as {this.props.userName}</span>
          <input
            id="comment_uploadFile"
            type="file"
            multiple
            accept="image/*"
            onChange={this.props.onUpload}
          />
          <label for="comment_uploadFile">
            <i className="addimage"></i>
            &nbsp; Choose a Image
          </label>
        </div>
        <div className="row">
          <img src={this.props.image} height="100" />
        </div>
        <div className="row">
          <button>comment</button>
        </div>
      </div>
    );
  }
}

export default Comment;
