import { FC, Fragment } from "react";
import { useRecoilValue } from "recoil";
import { Head } from "../Head";
// atoms
import { authAtom } from "../atoms/Auth";

// helpers
import { isLoggedIn } from "../helpers";
export const LoggedInRoute: FC<{
  login: { jsxElement: JSX.Element; title: string };
  logout: { jsxElement: JSX.Element; title: string };
}> = ({ login, logout }) => {
  const currentUser = useRecoilValue(authAtom);

  return (
    isLoggedIn(currentUser) ?
      <Fragment>
        <Head
          title={login.title}
          type={"website"}
        />
        {login.jsxElement}
      </Fragment>
      :
      <Fragment>
        <Head
          title={logout.title}
          type={"website"}
        />
        {logout.jsxElement}
      </Fragment>
  );
};
