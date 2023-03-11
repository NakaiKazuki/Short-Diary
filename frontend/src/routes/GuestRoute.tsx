import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";

// contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

export const GuestRoute: FC<{
  jsxElement: JSX.Element;
}> = ({ jsxElement }) => {
  const { currentUser } = useContext(AuthContext);

  return isLoggedIn(currentUser) ? <Navigate to="/" /> : jsxElement;
};
