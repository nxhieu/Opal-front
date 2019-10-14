/*
    This comment component render comment (and reply to comment) of  a post 
    url: /
 */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  getComment,
  postComment,
  editComment
} from "../../actions/commentAction";
import PropTypes from "prop-types";
import CreateReply from "./createReply";
import EditComment from "./editComment";
import "../../dist/comment/comment.css";

class Comment extends Component {
  state = {
    replyComment: false,
    editComment: false,
    post_id: this.props.comment._post,
    replyfileUrl: null,
    replyfile: null
  };

  replychangeHandler = event => {
    if (event.target.files[0] != null) {
      this.setState({
        replyfileUrl: URL.createObjectURL(event.target.files[0]),
        replyfile: event.target.files[0]
      });
    }
  };

  replysubmitImageHandler = event => {
    event.preventDefault();
    const replyfile = this.state.replyfile;
    this.props.postComment(
      this.state.post_id,
      replyfile,
      this.props.comment._id
    );
  };

  replyCommentHandler = () => {
    //mount or unmount the editComment, createReply component if clicked on reply button
    if (this.state.editComment === false) {
      this.setState({
        replyComment: !this.state.replyComment,
        replyfile: null,
        replyfileUrl: null
      });
    } else {
      this.setState({
        replyComment: !this.state.replyComment,
        editComment: !this.state.editComment,
        replyfile: null,
        replyfileUrl: null
      });
    }
  };

  editchangeHandler = event => {
    if (event.target.files[0] != null) {
      this.setState({
        replyfileUrl: URL.createObjectURL(event.target.files[0]),
        replyfile: event.target.files[0]
      });
    }
  };

  editsubmitImageHandler = event => {
    event.preventDefault();
    const replyfile = this.state.replyfile;
    this.props.editComment(this.props.comment, replyfile, this.state.post_id);
  };

  editCommentHandler = () => {
    //mount or unmount the editComment, createReply component if clicked on edit button
    if (this.state.replyComment === false) {
      this.setState({
        editComment: !this.state.editComment,
        replyfile: null,
        replyfileUrl: null
      });
    } else {
      this.setState({
        replyComment: !this.state.replyComment,
        editComment: !this.state.editComment,
        replyfile: null,
        replyfileUrl: null
      });
    }
  };

  render() {
    const { email, imageUrl, _id } = this.props.comment;

    return (
      <div className="comment">
        <div className="row">
          <span>{email}</span>
        </div>
        <div className="row">
          {
            <img
              src={`https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/${imageUrl}`}
            />
          }
        </div>
        <div className="row">
          <label htmlFor={_id}>
            <i className="reply" />
            &nbsp; Reply
          </label>
          <button id={_id} onClick={this.replyCommentHandler} />
          {this.props.email === email && (
            <Fragment>
              <label
                htmlFor={_id}
                id="delete-com"
                onClick={() =>
                  this.props.deleteComment(_id, this.props.post_id)
                }
              >
                Delete
              </label>

              <label htmlFor={`edit ${_id}`}>&nbsp; Edit</label>
              <button id={`edit ${_id}`} onClick={this.editCommentHandler} />
            </Fragment>
          )}
        </div>
        {this.state.replyComment && !this.state.editComment && (
          <div className="row">
            <CreateReply
              key={this.state.replyfileUrl}
              onChange={this.replychangeHandler}
              onSubmit={this.replysubmitImageHandler}
              replyfileUrl={this.state.replyfileUrl}
              email={this.props.email}
            />
          </div>
        )}
        {this.state.editComment && !this.state.replyComment && (
          <div className="row">
            <EditComment
              key={this.state.replyfileUrl}
              onChange={this.editchangeHandler}
              onSubmit={this.editsubmitImageHandler}
              replyfileUrl={this.state.replyfileUrl}
              email={this.props.email}
            />
          </div>
        )}

        {this.props.comment.child !== null
          ? this.props.comment.child.map(comment => (
              <div key={comment._id} className="child-comment">
                <Comment
                  post_id={this.props.post_id}
                  comment={comment}
                  email={this.props.email}
                  postComment={this.props.postComment}
                  deleteComment={this.props.deleteComment}
                  editComment={this.props.editComment}
                />
              </div>
            ))
          : null}
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  email: PropTypes.string,
  post_id: PropTypes.string,
  postComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  commentState: state.comment,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { getComment, postComment, editComment }
)(Comment);
