/*
    commentsList component render list of commments of a single post by mapping each comment.
    url: ./
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getComment,
  postComment,
  deleteComment
} from "../../actions/commentAction";
import PropTypes from "prop-types";
import CreateComment from "./createComment";
import Comment from "./comment";

class CommentsList extends Component {
  state = {
    file: null,
    fileUrl: null,
    post_id: this.props.post_id
  };

  //to see whether the user have choose file for the comment and get the img url and the file
  fileChangeHandler = event => {
    if (event.target.files[0] != null) {
      this.setState({
        fileUrl: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0]
      });
    }
  };

  //to see whether the comment is submitted and post the comment to backend to store in database
  //and update the state
  submitImageHandler = event => {
    event.preventDefault();
    const file = this.state.file;
    this.props.postComment(this.state.post_id, file, null);
    this.setState({
      fileUrl: null,
      file: null
    });
  };

  render() {
    const { comments } = this.props.commentState;

    return (
      <div>
        {this.props.authState.isAuthenticated ? (
          <CreateComment
            onChange={this.fileChangeHandler}
            onSubmit={this.submitImageHandler}
            fileUrl={this.state.fileUrl}
            email={this.props.authState.email}
          />
        ) : null}
        {comments.map(comment => (
          <div key={comment.imageUrl}>
            <Comment
              post_id={this.state.post_id}
              comment={comment}
              email={this.props.authState.email}
              postComment={this.props.postComment}
              deleteComment={this.props.deleteComment}
            />
          </div>
        ))}
      </div>
    );
  }
}

CommentsList.propTypes = {
  commentState: PropTypes.object.isRequired,
  postState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  commentState: state.comment,
  postState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { getComment, postComment, deleteComment }
)(CommentsList);
