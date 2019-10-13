import React, { Fragment, Component } from "react";
import Leaderboard from "./leaderboard/Leaderboard";
import Blogposts from "./post/Blogposts";
import Createpost from "./post/createpost/createPost";
import Welcome from "./welcome/Welcome";
import { connect } from "react-redux";
import { loaduser } from "../../actions/authAction";
import PropTypes from "prop-types";
import "../../dist/css/main.css";
import "../../dist/css/leaderboard.css";
import "../../dist/css/userPage.css";

class Userpage extends Component {
  render() {
    return (
      <Fragment>
        <div className="userPage">
          <div className="blogpost-leaderboard">
            <div className="blogpost-column">
              {this.props.authState.isAuthenticated && <Createpost />}

              <Blogposts userId={this.props.authState.userId} />
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

Userpage.propTypes = {
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { loaduser }
)(Userpage);
