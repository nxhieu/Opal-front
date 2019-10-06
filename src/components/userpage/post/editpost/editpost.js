import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { editPost } from "../../../../actions/postAction";
import "../../../../dist/css/editpost.css";
import placeholder from "../../../../img/blogpost/placeholder/image-placeholder.jpg";

export class editpost extends Component {
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
    this.props.editPost(file, this.props.post);
    this.setState({
      file: null,
      fileUrl: null
    });
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
            id="editfile"
            accept="image/*"
          />
          <p>Edit your post</p>

          <label className="putImage-label" htmlFor="editfile">
            {" "}
            {fileUrl ? (
              <img src={fileUrl} alt="post" />
            ) : (
              <Fragment>
                <img src={placeholder} width="100"></img>
                <p>{` Change your post here !`}</p>
              </Fragment>
            )}
          </label>

          <div className="btnstyle">
            {this.state.file && (
              <input type="submit" value="submit" className="btn-submit" />
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { editPost }
)(editpost);
