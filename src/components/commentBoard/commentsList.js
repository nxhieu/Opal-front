import React, { Component } from "react";
import "../../dist/comment/comment.css";
import CreateComment from "./createComment";
import { postImage } from "../../actions/postImageAction";

class CommentsList extends Component {
  state = {
    file: null,
    fileUrl: null,
    userName: "username"
  };

  fileChangeHandler = event => {
    if (event.target.files[0] != null) {
      this.setState({
        fileUrl: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0]
      });
    }
  };

  submitImageHandler = event => {
    event.preventDefault();
    const file = this.state.file;
    this.props.postImage(file);
  };

  render() {
    return (
      <CreateComment
        onChange={this.fileChangeHandler}
        onSubmit={this.submitImageHandler}
        fileUrl={this.state.fileUrl}
      />
    );
  }
}

export default CommentsList;
