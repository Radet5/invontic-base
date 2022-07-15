import React from "react";

import { SingleComponentTemplate } from "../templates/single-component/single-component";
import { Login } from "../login/login";

export const LoginPage = (): JSX.Element => {
  return (
    <SingleComponentTemplate>
      <Login />
    </SingleComponentTemplate>
  );
};
