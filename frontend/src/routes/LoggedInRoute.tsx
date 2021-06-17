import { VFC, useContext } from "react";
//contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

interface ILoggedInRouteProps {
  exact: true;
  path: string;
  login: JSX.Element;
  logout: JSX.Element;
}

export const LoggedInRoute: VFC<ILoggedInRouteProps> = ({ login, logout }) => {
  const { currentUser } = useContext(AuthContext);
  return isLoggedIn(currentUser) ? { ...login } : { ...logout };
};
