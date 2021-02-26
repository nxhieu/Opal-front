/*
  Welcome component displays welcome message on user page 
  url: /
*/

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../css/main.css";

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

class Welcome extends Component {
  
  displayName(){
    if(this.props.authState.firstName == null)
      return "Guest"
    return this.props.authState.firstName; 
  }  
  render() {
    return (
      <Fragment>
        <h3>{`Good ${timeOfDay} ${this.displayName()} !`}</h3>
      </Fragment>
    );
  }
}

Welcome.propTypes = {
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps)(Welcome);
