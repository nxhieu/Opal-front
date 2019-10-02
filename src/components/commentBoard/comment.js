import React, { Component } from "react";
import "../../dist/comment/createComment.css";

class Comment extends Component {
  state = {};
  render() {
    const { email, imageUrl, _user, _post } = this.props.comment;
    return (
      <div className="comment">
        <div className="row">
          <span>Comment as {_user}</span>
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
