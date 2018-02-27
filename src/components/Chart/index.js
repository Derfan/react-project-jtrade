import React, { Component } from "react";
import nanoid from "nanoid";
import { LineChart } from "react-chartkick";
import { connect } from "react-redux";

import "./styles.css";
import ChartButton from "../ChartButton";
import Loader from "../Loader";
import { getData, getLoading, getOffset } from "../../reducers/currency";
import { selectOffset } from "../../actions/currency";

export class Chart extends Component {
  state = {
    offsets: {
      "2h": "2ч",
      "4h": "4ч",
      "8h": "8ч",
      "1d": "1д",
      "7d": "7д"
    }
  };

  offsetHandler = e => {
    e.preventDefault();

    const offset = e.target.getAttribute("data-offset");

    this.props.selectOffset(offset);
  };

  renderChartButtons = () => {
    const { offsets } = this.state;
    const { selectedOffset } = this.props;

    return Object.entries(offsets).map(offset => (
      <ChartButton
        key={nanoid()}
        button={offset[1]}
        offset={offset[0]}
        onClick={this.offsetHandler}
        active={selectedOffset === offset[0]}
      />
    ));
  };

  getDataArray = (data, type) =>
    data && data.map(d => [new Date(d.mts), d[type]]);

  getData = () => {
    const { data } = this.props;

    return [
      { name: "Продажа", data: this.getDataArray(data, "sell") },
      { name: "Покупка", data: this.getDataArray(data, "purchase") }
    ];
  };

  getMinPrice = () => {
    const { data } = this.props;

    if (!data) {
      return 0;
    }

    const price = data.reduce((a, b) => Math.min(a, b.purchase), Infinity);

    return Math.floor(price);
  };

  getMaxPrice = () => {
    const { data } = this.props;

    if (!data) {
      return 0;
    }

    const price = data.reduce((a, b) => Math.max(a, b.sell), 0);

    return Math.ceil(price);
  };

  render() {
    const { isLoading } = this.props;

    return (
      <div className="chart">
        <h2 className="title">Окно графика</h2>
        <div className="wrapper">
          <div className="chart-header">
            Время сервера: 24:00
            <div className="buttons">{this.renderChartButtons()}</div>
          </div>
          <div className="chart-block">
            <LineChart
              data={this.getData()}
              min={this.getMinPrice()}
              max={this.getMaxPrice()}
              width={750}
              height={400}
            />
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: getData(state),
  isLoading: getLoading(state),
  selectedOffset: getOffset(state)
});

const mapDispatchToProps = {
  selectOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
