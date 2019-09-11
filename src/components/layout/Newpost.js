import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import "../../dist/css/main.css";
import newpost from "../../img/newpost/newpost.png";

class Newpost extends Component{

  render() {
    return (
      <div className="new-post-container">
        <ul>
          <li>
            <h2>Compose a New Post</h2>
          </li>
          <li>
              <Link to="/newpost">
                <img src={newpost} width="125" />
              </Link>
          </li>
        </ul>
        
      </div>
    );
  }
}

export default Newpost;
