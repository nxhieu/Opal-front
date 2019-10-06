import React, { Component } from "react";
import { connect } from "react-redux";
import { getRank } from "../../../actions/leaderboardAction";
import crown from "../../../img/leaderboard/crown.png";
import crowngold from "../../../img/leaderboard/stages/crowngold.png";
import crownsilver from "../../../img/leaderboard/stages/crownsilver.png";
import crownbronze from "../../../img/leaderboard/stages/crownbronze.png";

class Leaderboard extends Component {
  componentWillMount() {
    this.props.getRank();
  }

  render() {
    const { count, users } = this.props.leaderboardState;
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <img src={crown} width="50" alt="defaultCrown" />
          <h2>Leaderboard</h2>
        </div>
        <div className="leaderboard-content">
          <div className="leaderboard-user">
            <img src={crowngold} width="25" alt="rankFirst" />
            <p id="leaderboard-user-gold">
              1.&nbsp;{users[0]} {count[0]}
            </p>
          </div>
          <div className="leaderboard-user">
            <img src={crownsilver} width="25" alt="rankSecond" />
            <p id="leaderboard-user-silver">
              2.&nbsp;{users[1]} {count[1]}
            </p>
          </div>
          <div className="leaderboard-user">
            <img src={crownbronze} width="25" alt="rankThird" />
            <p id="leaderboard-user-bronze">
              3.&nbsp;{users[2]} {count[2]}
            </p>
          </div>
          <div className="leaderboard-user">
            <p id="leaderboard-th">
              4.&nbsp;{users[3]} {count[3]}
            </p>
          </div>
          <div className="leaderboard-user">
            <p id="leaderboard-th">
              5.&nbsp;{users[4]} {count[4]}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leaderboardState: state.leaderboard
});
export default connect(
  mapStateToProps,
  { getRank }
)(Leaderboard);
