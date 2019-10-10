import Editpost from "./editpost";
import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../../../dist/css/editmodal.css";

class editmodal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="background">
          <div className="editmodal">
            <span className="close" onClick={this.props.onClose}>
              &ensp;&times;
            </span>
            <Editpost post={this.props.post} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

editmodal.propTypes = {
  onclose: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

export default editmodal;
