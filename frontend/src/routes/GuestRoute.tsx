import { FC, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { Head } from "../Head";
import { useRecoilValue } from "recoil";
// atoms
import { authAtom } from "../atoms/Auth";
// helpers
import { isLoggedIn } from "../helpers";

export const GuestRoute: FC<{
  jsxElement: JSX.Element;
  title: string;
}> = ({ jsxElement, title }) => {
  const currentUser = useRecoilValue(authAtom);

  return isLoggedIn(currentUser) ? (
    <Navigate to="/" />
  ) : (
    <Fragment>
      <Head title={title} />
      {jsxElement}
    </Fragment>
  );
};
