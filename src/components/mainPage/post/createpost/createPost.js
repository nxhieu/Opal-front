/*
    CreatePost component displays a holder for user to post a new post.
    url: /
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../../../actions/postAction";
import PropTypes from "prop-types";
import "../../../../css/postImage.css";

class CreatePost extends Component {
  state = {
    file: null,
    fileUrl: null
  };
  onFileChange = event => {
    if (event.target.files[0] != null) {
      this.setState({
        fileUrl: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0]
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const file = this.state.file;
    this.props.createPost(file);
    this.setState({
      file: null,
      fileUrl: null
    });
  };

  render() {
    const { fileUrl, file } = this.state;
    const { email } = this.props.authState;
    return (
      <div className="postImage">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <p>Create post by {email}</p>
            <input
              className="file"
              onChange={this.onFileChange}
              type="file"
              id="post_uploadFile"
              accept="image/*"
            />
            <label htmlFor="post_uploadFile">
              <i className="addimage"></i>
              &nbsp; Choose a Image
            </label>
          </div>
          <div className="row">
            {fileUrl && <img src={fileUrl} alt="post" />}
          </div>
          <div className="row">
            {file && <input type="submit" value="Submit" />}
          </div>
        </form>
      </div>
    );
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  imageState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { createPost }
)(CreatePost);
