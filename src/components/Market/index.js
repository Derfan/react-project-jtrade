import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles.css";
import MarketField from "../MarketField";
import {
  getBtcSell,
  getEthSell,
  getBtcBuy,
  getEthBuy,
  getSelected
} from "../../reducers/currency";
import { getError } from "../../reducers/market";
import { sellRequest, buyRequest } from "../../actions/market";

export class Market extends Component {
  constructor(props) {
    super(props);

    const { btcSell, ethSell, btcBuy, ethBuy, selected } = props;
    const sell = selected === "btc" ? btcSell : ethSell;
    const buy = selected === "btc" ? btcBuy : ethBuy;

    this.state = {
      focused: "coin",
      coin: 1,
      sell,
      buy
    };
  }

  componentWillReceiveProps(nextProps) {
    const { btcSell, ethSell, btcBuy, ethBuy, selected } = nextProps;
    const { focused } = this.state;
    const sell = selected === "btc" ? btcSell : ethSell;
    const buy = selected === "btc" ? btcBuy : ethBuy;

    this.calcMoney(focused, sell, buy);
  }

  calcMoney = (name, sellPrice, buyPrice) => {
    switch (name) {
      case "coin":
        this.setState(({ coin }) => {
          const sell = coin * sellPrice;
          const buy = coin * buyPrice;
          return {
            sell,
            buy
          };
        });
        break;
      case "sell":
        this.setState(({ sell }) => {
          const coin = sell / buyPrice;
          const buy = coin * sellPrice;
          return {
            coin,
            buy
          };
        });
        break;
      case "buy":
        this.setState(({ buy }) => {
          const coin = buy / sellPrice;
          const sell = coin * buyPrice;
          return {
            coin,
            sell
          };
        });
        break;
      default:
        break;
    }
  };

  handleChange = e => {
    const { value, name } = e.target;
    const { btcSell, ethSell, btcBuy, ethBuy, selected } = this.props;
    const sell = selected === "btc" ? btcSell : ethSell;
    const buy = selected === "btc" ? btcBuy : ethBuy;

    this.setState(state => ({ [name]: value }));
    this.calcMoney(name, sell, buy);
  };

  trade = e => {
    const { name } = e.target;
    const { coin } = this.state;
    const { selected, sellRequest, buyRequest } = this.props;

    switch (name) {
      case "sell":
        sellRequest({
          currency: selected,
          value: coin
        });
        break;
      case "buy":
        buyRequest({
          currency: selected,
          value: coin
        });
        break;
      default:
        break;
    }
  };

  focusHandler = e => {
    this.setState({
      focused: e.target.name
    });
  };

  blurHandler = () => {
    this.setState({
      focused: "coin"
    });
  };

  render() {
    const { coin, sell, buy } = this.state;
    const { error, selected } = this.props;

    return (
      <div className="market">
        <h2>Покупка/продажа </h2>
        {error && <div className="error">{error}</div>}
        <div className="row">
          <MarketField
            name="coin"
            value={coin}
            label={selected}
            onChange={this.handleChange}
            onFocus={this.focusHandler}
            onBlur={this.blurHandler}
          />
        </div>
        <div className="row">
          <MarketField
            name="sell"
            value={sell}
            label="$"
            onChange={this.handleChange}
            onFocus={this.focusHandler}
            onBlur={this.blurHandler}
          />
          <button className="btn sell" name="sell" onClick={this.trade}>
            Продать
          </button>
        </div>
        <div className="row">
          <MarketField
            name="buy"
            value={buy}
            label="$"
            onChange={this.handleChange}
            onFocus={this.focusHandler}
            onBlur={this.blurHandler}
          />
          <button className="btn purchase" name="buy" onClick={this.trade}>
            Купить
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  btcSell: getBtcSell(state),
  ethSell: getEthSell(state),
  btcBuy: getBtcBuy(state),
  ethBuy: getEthBuy(state),
  selected: getSelected(state),
  error: getError(state)
});

const mapDispatchToProps = {
  sellRequest,
  buyRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
