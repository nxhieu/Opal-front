import React, { Component } from "react";
import { connect } from "react-redux";
import { getComment, postComment } from "../../actions/commentAction";
import CreateComment from "./createComment";
import Comment from "./comment";

export class CommentsList extends Component {
  state = {
    file: null,
    fileUrl: null,
    post_id: this.props.post_id
    // print: []
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
    this.props.postComment(this.state.post_id, file, null);
  };

  render() {
    const { comments } = this.props.commentState;
    return (
      <div>
        <CreateComment
          onChange={this.fileChangeHandler}
          onSubmit={this.submitImageHandler}
          fileUrl={this.state.fileUrl}
          email={this.props.authState.email}
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
