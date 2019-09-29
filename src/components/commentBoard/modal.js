import React, { Component } from "react";
import "../../dist/comment/modal.css";
import Comment from "./comment";
import Comments from "./comments";

class Modal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="background">
          <div className="modal">
            <span class="close" onClick={this.props.onClose}>
              &times;
            </span>
            <Comments />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Modal;
