import React, { Component } from "react";

class Comment extends Component {
  state = {
    userName: "<username>",
    image: ""
  };

  handleUpload = event => {
    this.setState({
      image: URL.createObjectURL(event.target.files[0])
    });
  };

  render() {
    return (
      <div>
        <table>
          <tr>
            <td>Comment as {this.state.userName}</td>
          </tr>
          <tr>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={this.handleUpload}
            />
          </tr>
          <tr>
            <div>
              <img src={this.state.image} height="100" />
            </div>
          </tr>
          <tr>
            <td>
              <button>comment</button>
            </td>
          </tr>
        </table>
      </div>
    );
  }

  //function to count amountOfEmoji
  //{amountOfEmoji} = this.state;
}

export default Comment;
