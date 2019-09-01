import React, { Component } from "react";
import { connect } from "react-redux";
import { postImage } from "../../actions/imageAction";

export class posts extends Component {
  state = {
    email: "hieu",
    file: null,
    fileUrl: null,
    message: ""
  };
  onFileChange = event => {
    // this.setState({
    //   fileUrl: URL.createObjectURL(event.target.files[0])
    // });
    this.setState({
      file: event.target.files[0]
    });
    console.log(this.state.file);
  };

  postImage = e => {
    e.preventDefault();
    const file = this.state.file;
    this.props.postImage(file);
  };

  render() {
    const { email, file, fileUrl } = this.state;
    return (
      <div className="post-form">
        <form onSubmit={this.onSubmit}>
          <p>{email}</p>
          <input onChange={this.onFileChange} type="file" accept="image/*" />

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
  imageState: state.image
});

export default connect(
  mapStateToProps,
  { postImage }
)(posts);
