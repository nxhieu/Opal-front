import React, { Component } from "react";
import { register } from "../../actions/authAction";
import { connect } from "react-redux";

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
  // useEffect(() => {
  //   // if (isAuthenticated) {
  //   //   //redirect in react
  //   //   console.log("ay");
  //   // }
  // }, []);
  //change state when user type int
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  // submit the form
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
        <h1>
          Account <span className="text-primary">Register</span>
        </h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="firstname"> First Name</label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.onChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={this.onChange}
              required
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   Auth: state.isAuthenticated
// });
export default connect(
  null,
  { register }
)(Register);
