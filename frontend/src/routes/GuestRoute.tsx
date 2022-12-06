import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";

// contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

interface IGuestRouteProps {
  jsxElement: JSX.Element;
}

export const GuestRoute: FC<IGuestRouteProps> = ({ jsxElement }) => {
  const { currentUser, headers } = useContext(AuthContext);

  return isLoggedIn(currentUser, headers) ? <Navigate to="/" /> : jsxElement;
};
