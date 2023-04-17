import { FC, useContext, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { Head } from "../Head";
// contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

export const GuestRoute: FC<{
  jsxElement: JSX.Element;
  title: string;
}> = ({ jsxElement, title }) => {
  const { currentUser } = useContext(AuthContext);

  return isLoggedIn(currentUser) ? (
    <Navigate to="/" />
  ) : (
    <Fragment>
      <Head title={title} />
      {jsxElement}
    </Fragment>
  );
};
