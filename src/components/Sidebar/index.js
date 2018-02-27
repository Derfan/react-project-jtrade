import React, { Component } from "react";

import "./styles.css";
import Wallet from "../Wallet";
import Market from "../Market";

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <Wallet />
        <Market />
      </div>
    );
  }
}
