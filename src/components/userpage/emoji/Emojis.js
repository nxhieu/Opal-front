import React, { Component, Fragment } from "react";
import Emoji from "./Emoji";
import "../../../dist/css/emoji.css";
import { connect } from "react-redux";
import { postEmoji } from "../../../actions/postAction";

export class emojis extends Component {
  state = {
    emojis: ["Cry", "EyeRoll", "HeartEyes", "Smile", "Thinking", "VeryAngry"],
    path: null,
    currentemoji: null
  };

  onChoosingEmoji = emoji => {
    this.state.currentemoji = emoji;
    this.props.postEmoji(
      emoji,
      this.props.post,
      this.props.authState.userId,
      this.props.authState.firstName
    );
    this.props.onShowEmoji();
  };

  render() {
    return (
      <div className="emoji-form">
        <input type="text" id="emoji" />
        <label
          className="label-emoji"
          value={this.state.currentemoji}
          htmlFor="emoji"
        >
          {/* {images} */}
          <div className="emojis-img">
            {this.state.emojis.map(emoji => (
              <Emoji
                key={emoji}
                emoji={emoji}
                chooseEmoji={this.onChoosingEmoji}
              />
            ))}
          </div>
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { postEmoji }
)(emojis);
