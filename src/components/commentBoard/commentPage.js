import React, { Component } from "react";
import Modal from "./modal";

class CommentPage extends Component {
  state = {
    create: false
  };

  createEventHandler = () => {
    this.setState({ create: true });
  };

  cancelEventHandler = () => {
    this.setState({ create: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.create && <Modal onClose={this.cancelEventHandler}></Modal>}

        <div className="first">
          <button onClick={this.createEventHandler}>Create Comment</button>
        </div>
      </React.Fragment>
    );
  }
}

export default CommentPage;
