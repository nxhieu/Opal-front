import React, { Fragment, Component } from "react";
import "../../dist/css/main.css";

class About extends Component {
  state = {
    date: new Date()
  };

  onChange = date => this.setState({ date });

  render() {
    return (
      <div className="about-page-content">
        <h2>Welcome to Opal Forums!</h2>
        <br />
        <p>
          This page was designed to post questions regarding opal card
          management as well as collecting user feedback about customer service.
        </p>
        <p>
          Log in to the forums to access our recent newsletter, user
          questionaries, FAQ and see the leaderboards.{" "}
        </p>
        <h3>Why OPAL forums?</h3>
        <br />
        <p>
          This website is an experiment and we think it might be successful in
          finding an answer to user-related enquiries.
        </p>
        <p>
          Joining is for free! Feel free to add your contribution to this forum
        </p>
        <h3>Visit our official website</h3>
        <p>Opal NSW</p>
      </div>
    );
  }
}

export default About;
