import React, { Component } from "react";
import "../../dist/comment/createComment.css";

class CreateReply extends Component {
  render() {
    return (
      <div className="comment">
        <h1>{this.props.replyfileUrl}</h1>
        <form onSubmit={this.props.onSubmit}>
          <div className="row">
            <span>Comment as {this.props.email}</span>
            <input
              id="comment_uploadFile"
              type="file"
              accept="image/*"
              onChange={this.props.onChange}
            />
            <label htmlFor="comment_uploadFile">
              <i className="addimage"></i>
              &nbsp; Choose a Image
            </label>
          </div>
          <div className="row">
            {this.props.replyfileUrl && <img src={this.props.replyfileUrl} />}
          </div>
          {this.props.replyfileUrl && (
            <div className="row">
              <input type="submit" value="Comment" />
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default CreateReply;
