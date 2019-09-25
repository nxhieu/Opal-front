import React, { Component } from "react";
import { connect } from "react-redux";
import { postImage } from "../../../../actions/postImageAction";

export class putImage extends Component {
  state = {
    file: null,
    fileUrl: null
  };
  onFileChange = event => {
    this.setState({
      fileUrl: URL.createObjectURL(event.target.files[0])
    });
    this.setState({
      file: event.target.files[0]
    });
    console.log(this.state.file);
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
          <input className="file" onChange={this.onFileChange} type="file" accept="image/*" />

          {fileUrl ? <img src={fileUrl} alt="post" width="100" /> : null}
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
  imageState: state.post
});

export default connect(
  mapStateToProps,
  { postImage }
)(putImage);
