import React, { Component } from "react";
import "../../dist/comment/createComment.css";

class CreateReply extends Component {
  render() {
    return (
      <div className="comment">
        <form onSubmit={this.props.onSubmit}>
          <div className="row">
            <span>Comment as {this.props.email}</span>
            <input
              id="reply_uploadFile"
              type="file"
              accept="image/*"
              onChange={this.props.onChange}
            />
            <label htmlFor="reply_uploadFile">
              <i className="addimage"></i>
              &nbsp; Choose a Image
            </label>
          </div>
          <div className="row">
            {this.props.replyfileUrl && <img src={this.props.replyfileUrl} />}
          </div>
          {this.props.replyfileUrl && (
            <div className="row">
              <input type="submit" value="Reply" />
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default CreateReply;
