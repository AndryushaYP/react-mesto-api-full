import React from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [data, setData] = React.useState({ password: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = data;
    onRegister(password, email);
  };

  return (
    <div className="login">
      <form
        action="#"
        method="POST"
        className="popup__form popup__form_type_login"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2 className="popup__title popup__title_type_login">Регистрация</h2>
        <label className="popup__label">
          <input
            placeholder="Email"
            type="email"
            name="email"
            className="popup__input popup__input_type_login"
            required
            onChange={handleChange}
          />
          <span className="popup__error" id="name-error"></span>
        </label>

        <label className="popup__label">
          <input
            placeholder="Пароль"
            type="password"
            name="password"
            className="popup__input popup__input_type_login"
            required
            onChange={handleChange}
          />
          <span className="popup__error" id="about-error"></span>
        </label>

        <button type="submit" value="" className="popup__button_type_login">
          Зарегистрироваться
        </button>
        <span className="login__button">
          Уже зарегистрированы?{" "}
          <Link className="login__button" to="/signin">
            Войти
          </Link>
        </span>
      </form>
    </div>
  );
}
