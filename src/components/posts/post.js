import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePost } from "../../actions/postAction";

export class post extends Component {
  onDelete = () => {
    console.log(this.props.post);
    this.props.deletePost(this.props.post);
  };

  render() {
    const { post } = this.props;
    console.log(post);
    return (
      <div className="post">
        <h2>{post.email}</h2>
        <img
          src={`https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/${post.imageUrl}`}
        />
        <h2>{post.createdAt}</h2>
        {this.props.authState.userId === post._user ? (
          <button onClick={this.onDelete}> Delete Post </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(post);
