import React, { Component } from "react";

export class posts extends Component {
  state = {
    email: "hieu",
    file: ""
  };
  onFileChange = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
    console.log(this.state.file);
  };

  render() {
    const { email } = this.state;
    return (
      <div>
        <form>
          <p>{email}</p>
          <input onChange={this.onFileChange} type="file" accept="image/*" />
          <p>{this.state.file}</p>
          <img src={this.state.file} alt="post" width="100" />
        </form>
      </div>
    );
  }
}

export default posts;
