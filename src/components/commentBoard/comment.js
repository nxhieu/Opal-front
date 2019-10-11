import React, { Component } from "react";
import { connect } from "react-redux";
import { getComment, postComment } from "../../actions/commentAction";
import PropTypes from "prop-types";
import CreateReply from "./createReply";
import "../../dist/comment/comment.css";

class Comment extends Component {
  state = {
    replyComment: false,
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
    this.setState({ replyComment: true });
  };

  render() {
    const { email, imageUrl, _id } = this.props.comment;
    console.log(this.props.comment._id);
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
          {this.props.email == email && (
            <label
              htmlFor={_id}
              id="delete-com"
              onClick={() => this.props.deleteComment(_id, this.props.post_id)}
            >
              Delete
            </label>
          )}
        </div>
        {this.state.replyComment && (
          <div className="row">
            <CreateReply
              onChange={this.replychangeHandler}
              onSubmit={this.replysubmitImageHandler}
              replyfileUrl={this.state.replyfileUrl}
              email={this.props.email}
            />
          </div>
        )}
        {this.props.comment.child !== null
          ? this.props.comment.child.map(comment => (
              <div className="child-comment">
                <Comment
                  key={comment._id}
                  post_id={this.props.post_id}
                  comment={comment}
                  email={this.props.email}
                  postComment={this.props.postComment}
                  deleteComment={this.props.deleteComment}
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
  { getComment, postComment }
)(Comment);
