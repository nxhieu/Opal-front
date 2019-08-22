import React, { Component } from "react";
import { login } from "../../actions/authAction";
import { connect } from "react-redux";
import "../../dist/css/main.css";

export class Login extends Component {
  state = { email: "", password: "" };

  componentDidMount() {
    const { isAuthenticated } = this.props.authState;
    if (isAuthenticated) {
      this.props.history.push("/Card");
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
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
          <div className ="btn btnstyle">
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

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
