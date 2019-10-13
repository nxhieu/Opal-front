import React, { Component, Fragment } from "react";
import Emoji from "./Emoji";
import PropTypes from "prop-types";
import "../../../dist/css/emoji.css";
import { connect } from "react-redux";
import { postEmoji } from "../../../actions/postAction";

class Emojis extends Component {
  state = {
    emojis: ["Cry", "EyeRoll", "HeartEyes", "Smile", "Thinking", "VeryAngry"],
    path: null,
    currentemoji: null
  };

  onChoosingEmoji = emoji => {
    this.props.postEmoji(
      emoji,
      this.props.post,
      this.props.authState.userId,
      this.props.authState.firstName
    );
    this.props.onChangeEmoji(emoji);
    this.props.onCloseEmoji();
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

Emojis.propTypes = {
  onChangeEmoji: PropTypes.func.isRequired,
  onCloseEmoji: PropTypes.func.isRequired,
  postEmoji: PropTypes.func.isRequired,
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { postEmoji }
)(Emojis);
