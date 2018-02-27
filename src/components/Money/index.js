import React, { Component } from "react";

import "./styles.css";

export default class Money extends Component {
  renderValue = () => {
    const valueArr = this.props.value.toString().split(".");

    return (
      <div className="value">
        <div className="left">{valueArr[0]}.</div>
        <div className="right">{valueArr[1] || "00"}</div>
      </div>
    );
  };

  render() {
    const { name } = this.props;

    return (
      <div className="money">
        {this.renderValue()}
        <div className="name">{name === "usd" ? "$" : name}</div>
      </div>
    );
  }
}
