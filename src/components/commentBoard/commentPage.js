import React, { Component } from "react";
import Comment from "./comment";
import Modal from "./modal";

class CommentPage extends Component {
  state = {
    create: false,
    image: "",
    userName: "username"
  };

  createEventHandler = () => {
    this.setState({ create: true });
  };

  cancelEventHandler = () => {
    this.setState({ create: false });
  };

  handleUpload = event => {
    this.setState({
      image: URL.createObjectURL(event.target.files[0])
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.create && (
          <Modal onClose={this.cancelEventHandler}>
            <Comment onUpload={this.handleUpload} />
          </Modal>
        )}
        <Comment />
        <div>
          <button onClick={this.createEventHandler}>Create Comment</button>
        </div>
      </React.Fragment>
    );
  }
}

export default CommentPage;
