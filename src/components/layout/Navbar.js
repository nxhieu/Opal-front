//Rendering the top navigation

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout, loaduser } from "../../actions/authAction";
import { connect } from "react-redux";
import "../../dist/css/navbar.css";
import logo from "../../img/UI/logo.png";
import smiley from "../../img/Smiling_Face.png";
import NotificationMenu from "../userpage/notificationmenu/NotificationMenu";

class Navbar extends Component {
  componentWillMount() {
    if (localStorage.getItem("token") !== null) {
      this.props.loaduser();
    }
  }
  onLogout = () => {
    this.props.logout();
  };

  render() {
    const { isAuthenticated } = this.props.authState;
    const { onLogout } = this;
    return (
      <div className="main-nav">
        <div className="logo">
          <ul>
            <li>
              <Link to="/">
                <img src={logo} alt="Logo" />
                &nbsp;HEAD PAGE
              </Link>
            </li>
          </ul>
        </div>
        <div className="right-nav">
          {!isAuthenticated ? (
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NotificationMenu />
              </li>
              <li>
                <Link to="/usersettings">Settings</Link>
              </li>
              <li>
                <Link to="/posts"> Your Posts</Link>
              </li>
              <li>
                <a onClick={onLogout} href="/">
                  Log out
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { logout, loaduser }
)(Navbar);
