import React, { Component, Fragment } from "react";
import Editpost from "./editpost";
import "../../../../dist/css/editmodal.css";

export class editmodal extends Component {
  render() {
    return (
      <Fragment>
        <div className="background">
          <div className="modal">
            <span className="close" onClick={this.props.onClose}>
              {" "}
              &times;
            </span>
            <div className="edit-form">
              <Editpost post={this.props.post} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default editmodal;
