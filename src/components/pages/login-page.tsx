import React, { Dispatch, SetStateAction } from "react";

import { UserInterface } from "../../modules/types/user";
import { SingleComponentTemplate } from "../templates/single-component/single-component";
import { Login } from "../login/login";

interface LoginPageProps {
  dispatch: Dispatch<SetStateAction<{ type: string; user: UserInterface }>>;
}

export const LoginPage = ({ dispatch }: LoginPageProps): JSX.Element => {
  return (
    <SingleComponentTemplate>
      <Login dispatch={dispatch} />
    </SingleComponentTemplate>
  );
};
