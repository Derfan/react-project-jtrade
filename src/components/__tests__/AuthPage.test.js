import React from "react";
import { shallow } from "enzyme";

import { AuthPage } from "../AuthPage";

describe("AuthPage", () => {
  const component = shallow(<AuthPage />);

  it("render", () => {
    expect(component.find(".auth")).toHaveLength(1);
    expect(component.find(".particles")).toHaveLength(1);
    expect(component.find(".wrapper")).toHaveLength(1);
    expect(component.find(".logo-wrapper")).toHaveLength(1);
    expect(component.find(".block")).toHaveLength(2);
    expect(component.find(".form")).toHaveLength(1);
    expect(component.find(".field")).toHaveLength(2);
    expect(component.find(".field-icon")).toHaveLength(2);
    expect(component.find(".field-wrapper")).toHaveLength(2);
    expect(component.find(".auth-footer")).toHaveLength(1);
    expect(component.find(".btn")).toHaveLength(1);
  });

  it("login state is default", () => {
    expect(component.find(".btn").contains("Войти")).toBeTruthy();
    expect(
      component.find(".auth-footer").contains(
        <div className="auth-footer">
          Впервые на сайте?{" "}
          <a href="" onClick={component.instance().changeMode}>
            Регистрация
          </a>
        </div>
      )
    ).toBeTruthy();
  });

  it("set registration state", () => {
    component.setState({ isRegistration: true });

    expect(component.find(".btn").contains("Регистрация")).toBeTruthy();
    expect(
      component.find(".auth-footer").contains(
        <div className="auth-footer">
          Уже зарегистрированы?{" "}
          <a href="" onClick={component.instance().changeMode}>
            Войти
          </a>
        </div>
      )
    ).toBeTruthy();
  });

  it("inputs", () => {
    const email = "test@email.ru";
    const password = "test pass";

    component
      .find(".field")
      .at(0)
      .simulate("change", {
        target: {
          value: email,
          name: "email"
        }
      });
    component
      .find(".field")
      .at(1)
      .simulate("change", {
        target: {
          value: password,
          name: "password"
        }
      });

    expect(component.state().email).toEqual(email);
    expect(component.state().password).toEqual(password);
  });
});
