/*
    Emoji component displays emoji image   
    url: /
 */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Emoji extends Component {
  render() {
    const image = this.props.emoji;
    return (
      <Fragment>
        <img
          src={require(`../../../img/emoji/${image}.png`)}
          onClick={() => this.props.chooseEmoji(image)}
        />
      </Fragment>
    );
  }
}

Emoji.propTypes = {
  emoji: PropTypes.string.isRequired
};

export default Emoji;
