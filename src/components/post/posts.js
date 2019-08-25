import React, { Component } from "react";

export class posts extends Component {
  state = {
    name: "hieu",
    file: null
  };
  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <form>
          <p>{name}</p>
          <input
            onChange={this.onFileChange.bind(this)}
            type="file"
            accept="image/*"
          />
        </form>
      </div>
    );
  }
}

export default posts;
