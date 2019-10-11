import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../dist/comment/createComment.css";

class CreateComment extends Component {
  render() {
    return (
      <div className="comment">
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
            {this.props.fileUrl && <img src={this.props.fileUrl} />}
          </div>
          {this.props.fileUrl && (
            <div className="row">
              <input type="submit" value="Comment" />
            </div>
          )}
        </form>
      </div>
    );
  }
}

CreateComment.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fileUrl: PropTypes.string,
  email: PropTypes.string
};

export default CreateComment;
