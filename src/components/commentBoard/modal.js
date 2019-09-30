import React, { Component } from "react";
import "../../dist/comment/modal.css";
import CommentsList from "./commentsList";

class Modal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="background">
          <div className="modal">
            <span className="close" onClick={this.props.onClose}>
              {" "}
              &times;
            </span>
            <CommentsList />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Modal;
