import React from "react";

import "./login.scss";

export const Login = () => {
  return (
    <div className="login">
      <div className="login__title">Login</div>
      <div className="login__form">
        <div className="login__form__input">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className="login__form__input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="login__form__input">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};
