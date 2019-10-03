import React, { Component } from "react";
import "../../dist/comment/comment.css";
import CreateComment from "./createComment";

class Comment extends Component {
  state = {};
  render() {
    const { email, imageUrl, _id } = this.props.comment;
    return (
      <div className="comment">
        <div className="row">
          <span>{email}</span>
        </div>
        <div className="row">
          {
            <img
              src={`https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/${imageUrl}`}
            />
          }
        </div>
        <div className="row">
          <label htmlFor={_id}>
            <i className="reply" />
            &nbsp; Reply
          </label>
          <button id={_id} onClick={this.props.onClick} />>
        </div>
        {this.props.reply && (
          <div className="row">
            <CreateComment />
          </div>
        )}
      </div>
    );
  }
}

export default Comment;
