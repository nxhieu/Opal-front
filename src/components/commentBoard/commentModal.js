/*
    This file contains Comment modal component. That get rendered for each post. 
    url: ./
 */
import React, { Component } from "react";
import "../../css/modal.css";
import CommentsList from "./commentsList";
import PropTypes from "prop-types";

//The modal will pop up while the comment is clicked in post
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
