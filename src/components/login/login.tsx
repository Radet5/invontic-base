import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import axios from "axios";

import { UserInterface } from "../../modules/types/user";
import { FieldRow } from "../atoms/field-row/field-row";
import { Field } from "../atoms/field/field";
import { useApi } from "../hooks/api";

import "./login.scss";

interface LoginProps {
  dispatch: Dispatch<SetStateAction<{ type: string; user: UserInterface }>>;
}

const baseUrl = process.env.API_URL;
const device_name = process.env.DEVICE_NAME;

export const Login = ({ dispatch }: LoginProps): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ isLoading, isError, data }, fetch, setPayload] = useApi({
    initialUrl: `${baseUrl}request-token`,
    method: "POST",
  });

  useEffect(() => {
    if (data?.token) {
      dispatch({ type: "SET_USER", user: data.user });
      axios.interceptors.request.use((req: any) => {
        // `req` is the Axios request config, so you can modify
        // the `headers`.
        req.headers.authorization = `Bearer ${data.token}`;
        return req;
      });
      //localStorage.setItem("token", data.token);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPayload({
      email,
      password,
      device_name,
    });
  };

  const form = (
    <form onSubmit={handleSubmit} className="login__form">
      <div className="login__title">Welcome To Invontic</div>
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
        <button type="submit">Login</button>
      </div>
    </form>
  );

  const loading = <div className="login__loading">Loading...</div>;
  const error = isError ? <div className="login__error">Error</div> : null;

  let content: JSX.Element;
  if (isLoading) {
    content = loading;
  } else {
    content = form;
  }

  return (
    <div className="login">
      {content}
      {error}
    </div>
  );
};
