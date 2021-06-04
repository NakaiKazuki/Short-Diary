import { VFC, useContext } from "react";
//contexts
import { CurrentUserContext } from "../contexts/CurrentUser";

// helpers
import { isLoggedIn } from "../helpers";

interface ILoggedInRouteProps {
  exact: true;
  path: string;
  login: JSX.Element;
  logout: JSX.Element;
}

export const LoggedInRoute: VFC<ILoggedInRouteProps> = ({ login, logout }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return isLoggedIn(currentUser) ? { ...login } : { ...logout };
};
