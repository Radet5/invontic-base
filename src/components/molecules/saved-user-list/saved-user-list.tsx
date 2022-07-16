import React, { Dispatch, SetStateAction } from "react";
import axios from "axios";

import { UserInterface } from "../../../modules/types/user";

import "./saved-user-list.scss";

interface SavedUserListProps {
  userFiles: Array<{
    user: UserInterface;
    token: string;
  }>;
  dispatch: Dispatch<SetStateAction<{ type: string; user: UserInterface }>>;
}

export const SavedUserList = ({
  userFiles,
  dispatch,
}: SavedUserListProps): JSX.Element => {
  return (
    <div className="m-saved-user-list">
      {userFiles.map((userFile: any) => {
        return (
          <button
            className="m-saved-user-list__user"
            key={userFile.user.id}
            onClick={() => {
              dispatch({ type: "SET_USER", user: userFile.user });
              axios.interceptors.request.use((req: any) => {
                req.headers.authorization = `Bearer ${userFile.token}`;
                return req;
              });
            }}
          >
            <div>{userFile.user.name}</div>
            <div>{userFile.user.email}</div>
          </button>
        );
      })}
    </div>
  );
};
