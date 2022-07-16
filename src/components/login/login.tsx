import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

import { UserInterface } from "../../modules/types/user";
import { FileHandler } from "../file-handler/file-handler";
import { LoginForm } from "../molecules/login-form/login-form";
import { SavedUserList } from "../molecules/saved-user-list/saved-user-list";

import "./login.scss";

interface LoginProps {
  dispatch: Dispatch<SetStateAction<{ type: string; user: UserInterface }>>;
}

export const Login = ({ dispatch }: LoginProps): JSX.Element => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [savedUsers, setSavedUsers] = useState<
    Array<{
      user: UserInterface;
      token: string;
    }>
  >([]);

  const filesApiRef = useRef(new FileHandler());
  const filesApi = filesApiRef.current;

  useEffect(() => {
    if (savedUsers.length > 0) {
      setShowLoginForm(false);
    } else {
      setShowLoginForm(true);
    }
  }, [savedUsers]);

  useEffect(() => {
    const getSavedUsers = async () => {
      const fileList = await filesApi.listFiles("users");
      const fileNames = fileList
        .filter((file: any) => file.type == "file")
        .map((file: any) => file.name);
      //console.log("fileList", fileList);
      const files = await filesApi.getManyFilesSecure("users", fileNames);
      //console.log("files", files);
      const users = files.map((file: any) => {
        return {
          token: file.data.token,
          user: file.data.user,
        };
      });
      setSavedUsers(users);
    };
    getSavedUsers();
  }, [filesApi]);

  const loginForm = showLoginForm ? (
    <LoginForm dispatch={dispatch} saveToFile={filesApi.saveSecureFile} />
  ) : (
    <button onClick={() => setShowLoginForm(true)}>Other User</button>
  );

  const userList =
    savedUsers.length > 0 ? (
      <SavedUserList userFiles={savedUsers} dispatch={dispatch} />
    ) : null;

  return (
    <div>
      <div className="login__title">Welcome To Invontic</div>
      {userList}
      {loginForm}
    </div>
  );
};
