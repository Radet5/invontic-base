import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";

import { UserInterface } from "../../../modules/types/user";
import { useApi } from "../../hooks/api";
import { Field } from "../../../components/atoms/field/field";
import { FieldRow } from "../../../components/atoms/field-row/field-row";

import "./login-form.scss";

interface LoginFormProps {
  dispatch: Dispatch<SetStateAction<{ type: string; user: UserInterface }>>;
  saveToFile: (
    id: string,
    subDirectory: string,
    data: { token: string; user: UserInterface },
    timestamp: string
  ) => void;
}

const baseUrl = process.env.API_URL;
const device_name = process.env.DEVICE_NAME;

export const LoginForm = ({
  dispatch,
  saveToFile,
}: LoginFormProps): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveLogin, setSaveLogin] = useState(false);
  const [{ isLoading, isError, data }, fetch, setPayload] = useApi({
    initialUrl: `${baseUrl}request-token`,
    method: "POST",
  });

  useEffect(() => {
    if (data?.token) {
      dispatch({ type: "SET_USER", user: data.user });
      axios.interceptors.request.use((req: any) => {
        req.headers.authorization = `Bearer ${data.token}`;
        return req;
      });
      //localStorage.setItem("token", data.token);
      if (saveLogin) {
        saveToFile(
          data.user.id,
          "users",
          data,
          new Date().getTime().toString()
        );
      }
    }
  }, [data, dispatch, saveToFile, saveLogin]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPayload({
      email,
      password,
      device_name,
    });
  };

  console.log("saveLogin", saveLogin);
  const form = (
    <form onSubmit={handleSubmit} className="m-login-form">
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
      <div className="m-login-form__checkbox-container">
        <label htmlFor="saveLogin">Save login info</label>
        <input
          type="checkbox"
          id="saveLogin"
          checked={saveLogin}
          onChange={() => setSaveLogin(!saveLogin)}
        />
      </div>
      <div className="login__form__input">
        <button type="submit">Login</button>
      </div>
    </form>
  );

  const loading = <div className="m-login-form__loading">Loading...</div>;
  const error = isError ? (
    <div className="m-login-form__error">Error</div>
  ) : null;

  let content: JSX.Element;
  if (isLoading) {
    content = loading;
  } else {
    content = form;
  }

  return (
    <div className="m-login-form">
      {content}
      {error}
    </div>
  );
};
