import { VFC, useContext } from "react";
import { Redirect } from "react-router-dom";

// contexts
import { CurrentUserContext } from "../contexts/CurrentUser";

// helpers
import { isLoggedIn } from "../helpers";

interface IPrivateRouteProps {
  exact: true;
  path: string;
  children: JSX.Element;
}

export const PrivateRoute: VFC<IPrivateRouteProps> = ({ children }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return isLoggedIn(currentUser) ? { ...children } : <Redirect to="/login" />;
};
