import { FC, useContext } from "react";
//contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

export const LoggedInRoute: FC<{
  login: JSX.Element;
  logout: JSX.Element;
}> = ({ login, logout }) => {
  const { currentUser } = useContext(AuthContext);

  return isLoggedIn(currentUser) ? login : logout;
};
