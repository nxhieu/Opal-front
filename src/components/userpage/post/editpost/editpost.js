import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { editPost } from "../../../../actions/postAction";
import PropTypes from "prop-types";
import "../../../../dist/css/postImage.css";

//component that helps to replace image in the current post
export class Editpost extends Component {
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
      <div className="postImage">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <p>Edit your post</p>
            <input
              className="file"
              onChange={this.onFileChange}
              type="file"
              id="editfile"
              accept="image/*"
            />
            <label htmlFor="editfile">
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

Editpost.propTypes = {
  editPost: PropTypes.func.isRequired,
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { editPost }
)(Editpost);
