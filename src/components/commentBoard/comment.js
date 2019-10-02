import React, { Component } from "react";
import "../../dist/comment/createComment.css";

class Comment extends Component {
  state = {};
  render() {
    const { _user, _post, email, imageUrl } = this.props.comment;
    return (
      <div className="comment">
        <div className="row">
          <span>Comment as {email}</span>
        </div>
        <div className="row">
          {
            <img
              src={`https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/${imageUrl}`}
            />
          }
        </div>
      </div>
    );
  }
}

export default Comment;
