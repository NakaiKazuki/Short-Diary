import { VFC, useContext } from "react";
import { Redirect } from "react-router-dom";

// contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

interface IGuestRouteProps {
  exact: true;
  path: string;
  children: JSX.Element;
}

export const GuestRoute: VFC<IGuestRouteProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return isLoggedIn(currentUser) ? <Redirect to="/" /> : { ...children };
};
