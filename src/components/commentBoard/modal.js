import React, { Component } from "react";
import "../../dist/comment/modal.css";
import CommentsList from "./commentsList";
import PropTypes from "prop-types";

class Modal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="background">
          <div className="modal">
            <span className="close" onClick={this.props.onClose}>
              &ensp;&times;
            </span>
            <CommentsList post_id={this.props.post_id} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  post_id: PropTypes.string.isRequired
};

export default Modal;
