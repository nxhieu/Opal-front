//Rendering the top navigation

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authAction";
import { connect } from "react-redux";
import "../../dist/css/main.css";
import logo from "../../img/UI/logo.png";
import bell from "../../img/UI/notification.png"
import Downshift from "downshift";
import NotificationMenu from "./NotificationMenu";

class Navbar extends Component {
  componentDidMount() {}
  onLogout = () => {
    this.props.logout();
  };

  render() {
    const { isAuthenticated } = this.props.authState;
    const { onLogout } = this;
    console.log(isAuthenticated);
    return (
      <div className="main-nav">
        <div className="logo">
          <ul>
            <li>
              <Link to="/">
                <img src={logo} width="80" />
              </Link>
            </li>
            <li>
              <h2>O P A L</h2>
            </li>
          </ul>
        </div>
        <div className="left-nav">
          {!isAuthenticated ? (
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li >
                <NotificationMenu/>
                
              </li>
              
              <li >
                <Link to="/usersettings">Settings</Link>
              </li>
              <li>
                <Link to="/card"> Your Cards</Link>
              </li>
              <li>
                <a onClick={onLogout} href="/">
                  Logout
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
  { logout }
)(Navbar);
