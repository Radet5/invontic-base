import React from "react";
import { UserInterface } from "../../modules/types/user";

export const UserContext = React.createContext<UserInterface | undefined>(
  undefined
);
