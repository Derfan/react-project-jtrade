import React, { Component } from "react";

import "./styles.css";
import logo from "../../assets/Logo.svg";
import whiteLogo from "../../assets/Logo-white.svg";

export default class Logo extends Component {
  render() {
    const { white } = this.props;

    return white ? (
      <img className="white-logo" src={whiteLogo} alt="" />
    ) : (
      <img className="default-logo" src={logo} alt="" />
    );
  }
}
