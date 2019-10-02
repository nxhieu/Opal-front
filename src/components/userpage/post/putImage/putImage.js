import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { postImage } from "../../../../actions/postImageAction";
import "../../../../dist/css/submit.css";
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
  };

  render() {
    const { fileUrl } = this.state;
    return (
      <div className="post-form">
        <form onSubmit={this.onSubmit}>
          <input
            className="file"
            onChange={this.onFileChange}
            type="file"
            id="file"
            accept="image/*"
          />
          <p>Create a post</p>

          <label className="putImage-label" htmlFor="file">
            {" "}
            {fileUrl ? (
              <img src={fileUrl} alt="post" />
            ) : (
              <Fragment>
                <img src={placeholder} width="100"></img>
                <p>{`Hi ${this.props.authState.firstName}! What are you thinking today ?`}</p>
              </Fragment>
            )}
          </label>

          <div className="btnstyle">
            <input
              type="submit"
              value="post"
              className="btn btn-primary btn-block"
            />
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
