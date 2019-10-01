import React, { Component } from "react";
import { render } from "react-dom";
import { TransitionMotion, spring } from "react-motion";
import "../../dist/css/main.css";

//TUTORIAL TAKEN FROM
//https://material-ui.com/ru/components/text-fields/
//https://reactjs.org/docs/conditional-rendering.html

export default class FieldLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '', output: '' ,
      active: (props.locked && props.active) || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || ""
    };

    this.handleUserInput = this.handleUserInput;
    this.handleChange = this.handleChange;
  }

  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: "" });
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  }

  render() {
    const { active, value, error, label } = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
      <div className={fieldClassName}>
        {active &&
          value &&
          predicted &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <input
          id={1}
          type="text"
          value={value}
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}
