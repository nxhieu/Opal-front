/*
    This file contains Register component.
    url: /register 
 */

import React, { Component } from "react";
import { register, clearErrors } from "../../actions/authAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "../../css/auth.css";

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    password2: ""
  };

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate() {
    // If user was successfully registered, navigate to main page ("/")
    const { isAuthenticated } = this.props.authState;
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // Submit the registration form
  onSubmit = e => {
    e.preventDefault();
    const {
      address,
      phone,
      lastname,
      firstname,
      email,
      password,
      password2
    } = this.state;

    if (
      address === "" ||
      phone === "" ||
      email === "" ||
      lastname === "" ||
      firstname === "" ||
      password === ""
    ) {
      console.log("Please type in all the details");
    } else {
      this.props.register({
        email,
        password,
        password2,
        phone,
        firstname,
        lastname,
        address
      });
    }
  };
  render() {
    const {
      lastname,
      firstname,
      phone,
      address,
      email,
      password,
      password2
    } = this.state;
    return (
      <div className="form-container">
        <h2>Create a new account</h2>
        <div className="form-group">
          <form onSubmit={this.onSubmit}>
            <label htmlFor="firstname"> First Name</label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={this.onChange}
              required
            />
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={this.onChange}
              required
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={this.onChange}
              required
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={this.onChange}
              required
            />
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.onChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.onChange}
              required
              minLength="6"
            />
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={this.onChange}
              required
            />
            <div>
              <input type="submit" value="Register" className="btn" />
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

Register.propTypes = {
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  authState: PropTypes.object
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { register, clearErrors }
  )(Register)
);
