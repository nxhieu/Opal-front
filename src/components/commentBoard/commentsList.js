import React, { Component } from "react";
import { connect } from "react-redux";
import { getComment, postComment } from "../../actions/commentAction";
import CreateComment from "./createComment";
import Comment from "./comment";

export class CommentsList extends Component {
  state = {
    file: null,
    fileUrl: null,
    post_id: this.props.post_id,
    print: null
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

  // listCommentHandler = () => {
  //   const { comments } = this.props.commentState;
  //   const commentArr = [];

  // comments.map(comment => {
  //   if (comment.parentsID == null) {
  //     commentArr.push(comment);
  //   }
  // });

  //   function recurse(comments_array, parents_id) {
  //     for (let i in comments_array) {
  //       if (comments_array[i]._id == parents_id) {
  //         let children = recurse(comments_array, comments_array[i]._id);

  //         if (children.length) {
  //           comments_array[i].children = children;
  //         }
  //         commentArr.push(comments_array[i]);
  //       }
  //     }
  //   }

  //   recurse(comments, null);

  //   this.setState({ print: JSON.stringify(commentArr) });
  // };

  // componentWillMount() {
  //   this.loadComment();
  // }

  // loadComment = () => {
  //   this.props.getComment(this.state.post_id);
  // };

  render() {
    const { comments } = this.props.commentState;
    return (
      <div>
        <h1 style={{ color: "black" }}>{this.state.print}</h1>
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
