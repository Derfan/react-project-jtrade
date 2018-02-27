import React, { Component } from "react";

import "./styles.css";

export default class MarketField extends Component {
  render() {
    const { label, ...props } = this.props;

    return (
      <div className="market-field">
        <input className="field" step="0.01" min="0" type="number" {...props} />
        <div className="label">{label}</div>
      </div>
    );
  }
}
