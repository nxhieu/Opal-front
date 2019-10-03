import React, { Component, Fragment } from "react";

export class Emoji extends Component {
  
  render() {
    const image = this.props.emoji;
    return (
      <Fragment>
        <img src={require(`../../../img/emoji/${image}.png`)} />
      </Fragment>
    );
  }
}

export default Emoji;
