// import React, { Component, Fragment } from "react";
import Editpost from "./editpost";

//             <editpost post={this.props.post} />
import React, { Component } from "react";
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
            {console.log(this.props.post)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default editmodal;
