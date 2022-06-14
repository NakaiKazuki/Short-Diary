import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";

// contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

interface IPrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return isLoggedIn(currentUser) ? children : <Navigate to="login" />;
};
