import React, { Component } from "react";
import { login } from "../../actions/authAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../dist/css/main.css";

export class Login extends Component {
  state = { email: "", password: "" };

  //lifecycle method invoked when updating happens in the props or state
  componentDidUpdate() {
    //if login was succesful navigate to /card
    const { isAuthenticated } = this.props.authState;
    if (isAuthenticated) {
      this.props.history.push("/Card");
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
        <h1>
          Account <span className="text-primary">Login</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="btn btnstyle">
            <input
              type="submit"
              value="Login"
              className="btn btn-primary btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}
//function that return the prop from store
const mapStateToProps = state => ({
  authState: state.auth
});
//use withRouter from 'react-router-dom' to wrap the component so that component has access to history object
// use connect from 'react-redux' to map State and functions from the authReducer to component
export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(Login)
);
