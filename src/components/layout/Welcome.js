import React, { Fragment, Component } from "react";
import "../../dist/css/main.css";

const element = <Welcome name="Sara" />;

class Welcome extends Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }