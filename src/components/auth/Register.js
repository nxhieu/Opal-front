//Register component
import React, { Component } from "react";
import { register } from "../../actions/authAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../dist/css/auth.css";

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

  //lifecycle method invoked when updating happens in the props or state
  componentDidUpdate() {
    //if registering was succesful navigate to /card
    const { isAuthenticated } = this.props.authState;
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }

  //change state whenever user type in
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  // submit the form
  onSubmit = e => {
    e.preventDefault();
    // spread operator to take out the state
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
    } else if (password !== password2) {
      console.log("Password do not match");
    } else {
      //call register function in redux function
      this.props.register({
        email,
        password,
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
      </div>
    );
  }
}
//function that return the prop from store
const mapStateToProps = state => ({
  authState: state.auth
});
//use withRouter from 'react-router-dom' to wrap the component so that component has access to history object
// use connect from 'react-redux' to map State and functions from the authReducer to component. REMEMBER THE FIRST ARGUMENT PASSING THE STATE TO PROPS . THE SECOND ARGUMENT (e.g {register}) map function the props of Register component
export default withRouter(
  connect(
    mapStateToProps,
    { register }
  )(Register)
);
