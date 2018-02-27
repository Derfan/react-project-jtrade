import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles.css";
import Logo from "../Logo";
import SwitchButton from "../SwitchButton";
import { selectEth, selectBtc } from "../../actions/currency";
import { getSelected, getBtcSell, getEthSell } from "../../reducers/currency";
import User from "../User";

export class Header extends Component {
  selectBtc = e => {
    e.preventDefault();

    this.props.selectBtc();
  };

  selectEth = e => {
    e.preventDefault();

    this.props.selectEth();
  };

  render() {
    const { selected, btcCurrency, ethCurrency } = this.props;

    return (
      <div className="header">
        <div className="container">
          <Logo white />
          <div className="title">Торги</div>
          <div className="button-wrapper">
            <SwitchButton
              name={"btc"}
              currency={btcCurrency}
              active={selected === "btc"}
              onClick={this.selectBtc}
            />
            <SwitchButton
              name={"eth"}
              currency={ethCurrency}
              active={selected === "eth"}
              onClick={this.selectEth}
            />
          </div>
          <User />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selected: getSelected(state),
  btcCurrency: getBtcSell(state),
  ethCurrency: getEthSell(state)
});

const mapDispatchToProps = {
  selectEth,
  selectBtc
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
