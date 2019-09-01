//Rendering the top navigation

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authAction";
import { connect } from "react-redux";
import "../../dist/css/main.css";
import logo from "../../img/logo.png";

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
              <h2>HEAD PAGE</h2>
            </li>
          </ul>
        </div>
        <div className="left-nav">
          {!isAuthenticated ? (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/posts"> Your Posts </Link>
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
