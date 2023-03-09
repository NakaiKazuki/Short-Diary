import { FC, useContext } from "react";
//contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

interface ILoggedInRouteProps {
  login: JSX.Element;
  logout: JSX.Element;
}

export const LoggedInRoute: FC<ILoggedInRouteProps> = ({ login, logout }) => {
  const { currentUser } = useContext(AuthContext);

  return isLoggedIn(currentUser) ? login : logout;
};
