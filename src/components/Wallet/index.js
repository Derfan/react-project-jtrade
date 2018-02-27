import React, { Component } from "react";
import { connect } from "react-redux";
import nanoid from "nanoid";

import "./styles.css";
import { getData, getLoading, getError } from "../../reducers/wallet";
import Loader from "../Loader";
import Money from "../Money";

export class Wallet extends Component {
  renderMoney = () => {
    const { data } = this.props;

    return (
      data &&
      Object.entries(data).map(money => (
        <div key={nanoid()} className="row">
          <Money value={money[1]} name={money[0]} />
        </div>
      ))
    );
  };

  render() {
    const { isLoading, error } = this.props;

    return (
      <div className="wallet">
        <h2>Ваш счёт</h2>
        {error && <div className="error">{error}</div>}
        <div className="wrapper">
          {this.renderMoney()}
          {isLoading && <Loader />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: getData(state),
  isLoading: getLoading(state),
  error: getError(state)
});

export default connect(mapStateToProps)(Wallet);
