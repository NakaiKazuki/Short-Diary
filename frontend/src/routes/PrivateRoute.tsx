import { VFC, useContext } from "react";
import { Redirect } from "react-router-dom";

// contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

interface IPrivateRouteProps {
  exact: true;
  path: string;
  children: JSX.Element;
}

export const PrivateRoute: VFC<IPrivateRouteProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return isLoggedIn(currentUser) ? { ...children } : <Redirect to="/login" />;
};
