import React, { Component } from "react";

import "./styles.css";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Chart from "../Chart";

export default class MainPage extends Component {
  render() {
    return (
      <div className="main">
        <Header
          switchButtons={[
            { name: "btc", currency: "14000", active: true },
            { name: "eth", currency: "4000" }
          ]}
        />
        <div className="container content">
          <Sidebar />
          <Chart />
        </div>
        <Footer />
      </div>
    );
  }
}
