/*
    This file contains Log in component.
    url: /login 
 */

import React, { Component } from "react";
import { login, clearErrors } from "../../actions/authAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "../../css/auth.css";

class Login extends Component {
  state = { email: "", password: "" };

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate() {
    //if login was succesful navigate to main page
    const { isAuthenticated } = this.props.authState;
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Submit the login form
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email === "" || password === "") {
      console.log("Please type in your email or password");
    } else {
      this.props.login({
        email: email,
        password: password
      });
    }
  };

  render() {
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <div className="form-container">
        <h2>Sign in</h2>
        <div className="form-group">
          <form onSubmit={onSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
            <div>
              <input type="submit" value="Login" className="btn" />
            </div>
          </form>
        </div>
        <div className="fail_authentication">
          {this.props.authState.error !== null ? (
            <h6>{this.props.authState.error}</h6>
          ) : null}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { login, clearErrors }
  )(Login)
);
