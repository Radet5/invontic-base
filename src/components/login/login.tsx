import React, { useState } from "react";
import { FieldRow } from "../atoms/field-row/field-row";
import { Field } from "../atoms/field/field";

import "./login.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <div className="login__form">
        <FieldRow noBorder={true}>
          <Field
            id={"email"}
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(name, value) => setEmail(value)}
          />
          <Field
            id={"password"}
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(name, value) => setPassword(value)}
          />
        </FieldRow>
        <div className="login__form__input">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};
