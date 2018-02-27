import React, { Component } from "react";
import { Particles } from "react-particles-js";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./styles.css";
import particlesParams from "../../particles-params";
import iconUser from "../../assets/login/user-shape.svg";
import iconPadlock from "../../assets/login/padlock-unlock.svg";
import { loginRequest, registrationRequest } from "../../actions/auth";
import { getError, getIsAuthorized } from "../../reducers/auth";
import Logo from "../Logo";

export class AuthPage extends Component {
  state = {
    email: "",
    password: "",
    isRegistration: false
  };

  changeHandler = e => {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    });
  };

  changeMode = e => {
    e.preventDefault();

    this.setState({
      isRegistration: !this.state.isRegistration
    });
  };

  submitHandler = e => {
    e.preventDefault();

    const { isRegistration, email, password } = this.state;
    const { loginRequest, registrationRequest } = this.props;

    if (isRegistration) {
      registrationRequest({ email, password });
    } else {
      loginRequest({ email, password });
    }
  };

  render() {
    const { isAuthorized, error } = this.props;
    const { email, password, isRegistration } = this.state;

    return (
      <div className="auth">
        {isAuthorized && <Redirect to="/main" />}
        <Particles className="particles" params={particlesParams} />
        <div className="wrapper">
          <div className="logo-wrapper">
            <Logo />
          </div>
          <div className="block">
            <form className="form" onSubmit={this.submitHandler}>
              <div className="field-wrapper">
                <img src={iconUser} alt="login" className="field-icon" />
                <input
                  type="email"
                  className="field"
                  placeholder="login"
                  name="email"
                  value={email}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="field-wrapper">
                <img src={iconPadlock} alt="password" className="field-icon" />
                <input
                  type="password"
                  className="field"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={this.changeHandler}
                />
              </div>
              {error && <div className="error">{error}</div>}
              <button className="btn">
                {isRegistration ? "Регистрация" : "Войти"}
              </button>
            </form>
          </div>
          <div className="block center">
            {isRegistration ? (
              <div className="auth-footer">
                Уже зарегистрированы?{" "}
                <a href="" onClick={this.changeMode}>
                  Войти
                </a>
              </div>
            ) : (
              <div className="auth-footer">
                Впервые на сайте?{" "}
                <a href="" onClick={this.changeMode}>
                  Регистрация
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  error: getError(state)
});

const mapDispatchToProps = {
  loginRequest,
  registrationRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
