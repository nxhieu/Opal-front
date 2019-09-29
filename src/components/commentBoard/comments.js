import React, { Component } from "react";
import "../../dist/comment/comment.css";
import Comment from "./comment";
import { postImage } from "../../actions/postImageAction";

class Comments extends Component {
  state = {
    file: null,
    fileUrl: null,
    userName: "username"
  };

  onFileChange = event => {
    if (event.target.files[0] != null) {
      this.setState({
        fileUrl: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0]
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const file = this.state.file;
    this.props.postImage(file);
  };

  render() {
    return <Comment />;
  }
}

export default Comments;
