import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles.css";
import { logout } from "../../actions/auth";
import { getUser } from "../../reducers/user";

export class User extends Component {
  state = {
    showDrop: false
  };

  dropHandler = () => {
    this.setState({
      showDrop: !this.state.showDrop
    });
  };

  logoutHandler = () => {
    this.props.logout();
  };

  render() {
    const { user } = this.props;
    const { showDrop } = this.state;

    return (
      <div className="user">
        <div className="handler" onClick={this.dropHandler}>
          {user ? user.email : "Menu"}
        </div>
        <div className={"drop" + (showDrop ? " show" : "")}>
          <button className="btn" onClick={this.logoutHandler}>
            Выйти
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
});

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
