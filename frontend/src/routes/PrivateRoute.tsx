import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";

// contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

interface IPrivateRouteProps {
  jsxElement: JSX.Element;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ jsxElement }) => {
  const { currentUser } = useContext(AuthContext);

  return isLoggedIn(currentUser) ? jsxElement : <Navigate to="/login" />;
};
