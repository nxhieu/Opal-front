import React, { Component } from "react";
import { connect } from "react-redux";
import { getComment, postComment } from "../../actions/commentAction";
import "../../dist/comment/comment.css";
import CreateReply from "./createReply";

export class Comment extends Component {
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
        {this.props.comment.child.map(comment => (
          <div className="child-comment">
            <Comment
              key={comment._id}
              comment={comment}
              email={this.props.email}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commentState: state.comment,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { getComment, postComment }
)(Comment);
