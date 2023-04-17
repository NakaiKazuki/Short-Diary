import { FC, useContext, Fragment } from "react";
import { Head } from "../Head";
//contexts
import { AuthContext } from "../contexts/Auth";

// helpers
import { isLoggedIn } from "../helpers";

export const LoggedInRoute: FC<{
  login: { jsxElement: JSX.Element; title: string };
  logout: { jsxElement: JSX.Element; title: string };
}> = ({ login, logout }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Fragment>
      <Head title={isLoggedIn(currentUser) ? login.title : logout.title} />
      {isLoggedIn(currentUser) ? login.jsxElement : logout.jsxElement};
    </Fragment>
  );
};
