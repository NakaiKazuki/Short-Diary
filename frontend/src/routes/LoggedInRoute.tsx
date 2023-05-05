import { FC, Fragment } from "react";
import { useRecoilValue } from "recoil";
import { Head } from "../Head";
// atoms
import { authAtom } from "../recoils/Auth";

// helpers
import { isLoggedIn } from "../helpers";

export const LoggedInRoute: FC<{
  login: { jsxElement: JSX.Element; title: string };
  logout: { jsxElement: JSX.Element; title: string };
  type: string;
}> = ({ login, logout, type }) => {
  const currentUser = useRecoilValue(authAtom);

  return (
    <Fragment>
      <Head
        title={isLoggedIn(currentUser) ? login.title : logout.title}
        type={type}
      />
      {isLoggedIn(currentUser) ? login.jsxElement : logout.jsxElement};
    </Fragment>
  );
};
