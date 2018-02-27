import React, { Component } from "react";

import "./styles.css";

export default class SwitchButton extends Component {
  render() {
    const { name, currency, active, onClick } = this.props;

    return (
      <a
        href=""
        className={"switch-button" + (active ? " active" : "")}
        onClick={onClick}
      >
        <span className="name">{name}</span>
        <span className="currency">
          {currency > 0 ? currency.toFixed(2) : "-"}
        </span>
      </a>
    );
  }
}
