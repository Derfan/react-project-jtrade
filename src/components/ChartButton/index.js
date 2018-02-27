import React, { Component } from "react";

import "./styles.css";

export default class ChartButton extends Component {
  render() {
    const { button, offset, onClick, active } = this.props;

    return (
      <a
        href=""
        className={"chart-button" + (active ? " active" : "")}
        data-offset={offset}
        onClick={onClick}
      >
        {button}
      </a>
    );
  }
}
