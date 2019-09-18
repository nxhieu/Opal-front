import React, { Component } from "react";

export class posts extends Component {
  state = {
    email: "hieu",
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

  render() {
    const { email, file, fileUrl } = this.state;
    return (
      <div className="post-form">
        <form>
          <p>{email}</p>
          <input onChange={this.onFileChange} type="file" accept="image/*" />

          {fileUrl ? <img src={fileUrl} alt="post" width="100" /> : null}
        </form>
      </div>
    );
  }
}

export default posts;
