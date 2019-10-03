import React, { Component, Fragment } from "react";
import Emoji from "./Emoji";
import "../../../dist/css/emoji.css";

export class emojis extends Component {
  state = {
    emojis: ["Cry", "EyeRoll", "HeartEyes", "Smile", "Thinking", "VeryAngry"],
    path: null
  };

  render() {
    // let images = this.state.emojis.map(image => {
    //   return (
    //     <img
    //       key={image}
    //       src={require(`../../../img/emoji/${image}.png`)}
    //       alt=""
    //       className="img-responsive"
    //     />
    //   );
    // });
    return (
      <div className="emoji-form">
        <input type="text" id="emoji" />
        <label className="label-emoji" htmlFor="emoji">
          {/* {images} */}
          <div className="emojis-img">
            {this.state.emojis.map(emoji => (
              <Emoji key={emoji} emoji={emoji} />
            ))}
          </div>
        </label>
      </div>
    );
  }
}

export default emojis;
