import React, { Component } from "react";
import "../../dist/css/main.css";

export class UserSettingsPage extends Component {
  state = {
    email: "",
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
      <div className="user-avatar">
        <form>
          <p>{email}</p>
          <input onChange={this.onFileChange} type="file" accept="image/*" />
          <p>{this.state.file}</p>
          <img src={this.state.file}  width="200" />
        </form>
      </div>
    );
  }
}

export default UserSettingsPage;
