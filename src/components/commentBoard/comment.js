import React, { Component } from "react";
import { connect } from "react-redux";
import { getComment, postComment } from "../../actions/commentAction";
import "../../dist/comment/comment.css";
import CreateReply from "./createReply";

export class Comment extends Component {
  state = {
    replyComment: false,
    post_id: this.props.comment._post,
    parents_id: this.props.comment.parentsID,
    replyfileUrl: null,
    replyfile: null
  };

  replychangeHandler = event => {
    console.log("here");
    if (event.target.files[0] != null) {
      this.setState({
        replyfileUrl: URL.createObjectURL(event.target.files[0]),
        replyfile: event.target.files[0]
      });
    }
  };

  replysubmitImageHandler = event => {
    event.preventDefault();
    const file = this.state.file;
    this.props.postComment(this.state.post_id, file, 0);
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
              email={this.props.authState.email}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commentState: state.comment,
  postState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { getComment, postComment }
)(Comment);
