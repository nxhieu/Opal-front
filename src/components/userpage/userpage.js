import React, { Fragment, Component } from "react";
import Leaderboard from "./leaderboard/Leaderboard";
import Blogposts from "./post/Blogposts";
import PutImage from "./post/putImage/putImage";
import "../../dist/css/main.css";
import "../../dist/css/leaderboard.css";
import "../../dist/css/userPage.css";
import Welcome from "./welcome/Welcome";

class Userpage extends Component {
  render() {
    return (
      <Fragment>
        <div className="userPage">
          <div className="blogpost-leaderboard">
            <div className="blogpost-column">
              {/* <PutImage /> */}
              <Blogposts />
            </div>
            <div className="leaderboard-column">
              <div className="welcome">
                <Welcome />
              </div>
              <Leaderboard />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Userpage;
