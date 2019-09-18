import React, { Fragment, Component } from "react";
import Leaderboard from "../layout/Leaderboard";
import InfiniteScroll from "../layout/Infinitescroll";
import "../../dist/css/main.css";
import "../../dist/css/flipclock.css";
import Welcome from "../layout/Welcome";

class Userpage extends Component {
  render() {
    return (
      <Fragment>
        <div className="blogpost-leaderboard">
          <div className="blogpost-column">
            <InfiniteScroll />
          </div>
          <div className="leaderboard-column">
            <div className="welcome">
              <Welcome />
            </div>
            <Leaderboard />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Userpage;
