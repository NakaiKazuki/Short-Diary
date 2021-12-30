import { VFC, useContext } from "react";
import { Navigate} from "react-router-dom";

// contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

interface IGuestRouteProps {
  children: JSX.Element;
}

export const GuestRoute: VFC<IGuestRouteProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return isLoggedIn(currentUser) ? (
    <Navigate to="/" />
  ) : (
    children
  );
};
