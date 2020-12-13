import React from "react";
import logo from "../images/logo.svg";
import { Link, Route } from "react-router-dom";

export default function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto" className="header__logo" />
      <Route path="/home">
        <p className="header__email">
          {email}
          <Link
            className="header__button header__button-grey header__button_type_visible"
            to="/signin"
            onClick={onSignOut}
          >
            Выйти
          </Link>
        </p>
      </Route>
      <Route path="/signin">
        <Link className="header__button header__button_type_visible" to="/signup">
          Регистрация
        </Link>
      </Route>
      <Route path="/signup">
        <Link className="header__button header__button_type_visible" to="/signin">
          Войти
        </Link>
      </Route>
    </header>
  );
}
