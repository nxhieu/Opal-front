import React, { Component } from "react";
import "../../dist/comment/modal.css";
import Comment from "./comment";

class Modal extends Component {
  state = {
    image: "",
    userName: "username"
  };

  handleUpload = event => {
    this.setState({
      image: URL.createObjectURL(event.target.files[0])
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="background">
          <div className="modal">
            <span class="close" onClick={this.props.onClose}>
              &times;
            </span>
            <Comment
              onClick={this.handleUpload}
              userName={this.state.userName}
              image={this.state.image}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Modal;
