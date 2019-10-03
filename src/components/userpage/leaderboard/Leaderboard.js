import React, { Component } from "react";
import crown from "../../../img/leaderboard/crown.png";
import crowngold from "../../../img/leaderboard/stages/crowngold.png";
import crownsilver from "../../../img/leaderboard/stages/crownsilver.png";
import crownbronze from "../../../img/leaderboard/stages/crownbronze.png";

class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <ul>
            <li>
              <img src={crown} width="50" alt="defaultCrown" />
            </li>
            <li>
              <h2>Leaderboard</h2>
            </li>
          </ul>
        </div>
        <div className="leaderboard-content">
          <ul className="leaderboard-crown">
            <li>
              <img src={crowngold} width="25" alt="defaultCrown" />
            </li>
            <li>
              <img src={crownsilver} width="25" alt="defaultCrown" />
            </li>
            <li>
              <img src={crownbronze} width="25" alt="defaultCrown" />
            </li>
          </ul>
          <ol className="leaderboard-user">
            <li className="leaderboard-user-gold">
              <p>Kjisddu (1035)</p>
            </li>
            <li className="leaderboard-user-silver">
              <p>Lidkul (963)</p>
            </li>
            <li className="leaderboard-user-bronze">
              <p>Odis (760)</p>
            </li>
            <li>
              <p>Defovim (723)</p>
            </li>
            <li>
              <p>Mundio (362)</p>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}
export default Leaderboard;
