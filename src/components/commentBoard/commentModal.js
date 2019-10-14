/*
    This file contains Comment modal component. That get rendered for each post. 
    url: /
 */
import React, { Component } from "react";
import "../../dist/comment/modal.css";
import CommentsList from "./commentsList";
import PropTypes from "prop-types";

class CommentModal extends Component {
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

CommentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  post_id: PropTypes.string.isRequired
};

export default CommentModal;
