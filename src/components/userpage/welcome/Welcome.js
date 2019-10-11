import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../../../dist/css/main.css";

//This component is responsible for displaying a message depending on the time of day, depending which user is logged in.
//Turorials used:
//https://www.youtube.com/watch?v=ZKwrOXl5TDI
//https://stackoverflow.com/questions/52933997/adding-a-greeting-to-a-react-app-based-on-the-time-of-day

const date = new Date();
const hours = date.getHours();
let timeOfDay;

if (hours < 12) {
  timeOfDay = "morning";
} else if (hours >= 12 && hours < 17) {
  timeOfDay = "afternoon";
} else {
  timeOfDay = "night";
}

export class Welcome extends Component {
  render() {
    return (
      <Fragment>
        <h3>{`Good ${timeOfDay} ${this.props.authState.firstName}!`}</h3>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps)(Welcome);
