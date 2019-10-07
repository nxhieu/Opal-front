import React, { Component, Fragment } from "react";
import { connect, withRouter } from "react-redux";
import { postImage } from "../../../../actions/postImageAction";
import "../../../../dist/css/postImage.css";
import placeholder from "../../../../img/blogpost/placeholder/image-placeholder.jpg";

export class putImage extends Component {
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
    this.props.postImage(file);
    this.setState({
      file: null,
      fileUrl: null
    });
  };

  render() {
    const { fileUrl } = this.state;
    return (
      <div className="postImage">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <p>Create post by {this.props.authState.email}</p>
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
            {this.state.file && <input type="submit" value="Submit" />}
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  imageState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { postImage }
)(putImage);
