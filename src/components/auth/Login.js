/*
    This file contains Log in component.
    url: /login 
 */

import React, { Component } from "react";
import { login, reset } from "../../actions/authAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "../../dist/css/auth.css";

class Login extends Component {
  state = { email: "", password: "" };

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidUpdate() {
    //if login was succesful navigate to main page
    const { isAuthenticated } = this.props.authState;
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }

  //Change state whenever user type in the input fields
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //login
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
          {this.props.authState.error === "Incorrect username or password" ? (
            <h6>{this.props.authState.error}</h6>
          ) : null}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

//function that return the prop from store
const mapStateToProps = state => ({
  authState: state.auth
});
//use withRouter from 'react-router-dom' to wrap the component so that component has access to history object
// use connect from 'react-redux' to map State and functions from the authReducer to component
export default withRouter(
  connect(
    mapStateToProps,
    { login, reset }
  )(Login)
);
