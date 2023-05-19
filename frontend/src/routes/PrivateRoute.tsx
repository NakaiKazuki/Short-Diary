import { FC, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { Head } from "../Head";
import { useRecoilValue } from "recoil";

// atoms
import { authAtom } from "../atoms";

// helpers
import { isLoggedIn } from "../helpers";

export const PrivateRoute: FC<{
  jsxElement: JSX.Element;
  title: string;
}> = ({ jsxElement, title }) => {
  const currentUser = useRecoilValue(authAtom);

  return isLoggedIn(currentUser) ? (
    <Fragment>
      <Head title={title} />
      {jsxElement}
    </Fragment>
  ) : (
    <Navigate to="/" />
  );
};
