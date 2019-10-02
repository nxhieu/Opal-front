import React, { Component } from "react";
import { connect } from "react-redux";
import { getComment, postComment } from "../../actions/commentAction";
import CreateComment from "./createComment";
import Comment from "./comment";

export class CommentsList extends Component {
  state = {
    file: null,
    fileUrl: null,
    userName: "username",
    post_id: this.props.post_id
  };

  fileChangeHandler = event => {
    if (event.target.files[0] != null) {
      this.setState({
        fileUrl: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0]
      });
    }
  };

  submitImageHandler = event => {
    event.preventDefault();
    const file = this.state.file;
    this.props.postComment(this.state.post_id, file);
  };

  render() {
    const { comments } = this.props.commentState;
    const { posts } = this.props.postState;
    return (
      <div>
        <h1>{comments ? "have" : "no"}</h1>
        <h1>
          {comments.map(comment => (
            <h1>{comment._post}</h1>
          ))}
        </h1>
        <CreateComment
          onChange={this.fileChangeHandler}
          onSubmit={this.submitImageHandler}
          fileUrl={this.state.fileUrl}
        />
        {comments.map(comment => (
          <div>
            <Comment key={comment._id} comment={comment} />
          </div>
        ))}
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
)(CommentsList);
