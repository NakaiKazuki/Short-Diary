import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Cookies from "js-cookie";

// routes
import { Route } from "react-router-dom";
import { RouteLayout } from "./RouteLayout";

// recoils
import { authAtom } from "../recoils/Auth";

// components
import { LogoutHome } from "../containers/LogoutHome";
import { LoginHome } from "../containers/LoginHome";
import { SignUp } from "../containers/SignUp";
import { Login } from "../containers/Login";
import { ResetPassword } from "../containers/ResetPassword";
import { NewPassword } from "../containers/NewPassword";
import { UserEdit } from "../containers/UserEdit";
import { PhotoGallery } from "../containers/PhotoGallery";
import { GuestRoute } from "../routes/GuestRoute";
import { PrivateRoute } from "../routes/PrivateRoute";
import { LoggedInRoute } from "./LoggedInRoute";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// apis
import { getCurrentUser } from "../apis/users/sessions";

// helpers
import { removeUserCookies, setUserCookies } from "../helpers";

const getCookie = (name: string) => Cookies.get(name);
const isCookies: string | undefined =
  getCookie("access-token") && getCookie("client") && getCookie("uid");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route
        index
        element={
          <LoggedInRoute
            login={{ jsxElement: <LoginHome />, title: "User Home" }}
            logout={{ jsxElement: <LogoutHome />, title: "Home" }}
            type="website"
          />
        }
      />
      <Route
        path="/signup"
        element={<GuestRoute jsxElement={<SignUp />} title="SignUp" />}
      />
      <Route
        path="/login"
        element={<GuestRoute jsxElement={<Login />} title="Login" />}
      />
      <Route
        path="/resetPassword"
        element={
          <GuestRoute jsxElement={<ResetPassword />} title="Reset Password" />
        }
      />
      <Route
        path="/newPassword"
        element={
          <GuestRoute jsxElement={<NewPassword />} title="New Password" />
        }
      />
      <Route
        path="/userEdit"
        element={<PrivateRoute jsxElement={<UserEdit />} title="UserEdit" />}
      />
      <Route
        path="/photoGalley"
        element={
          <PrivateRoute jsxElement={<PhotoGallery />} title="PhotoGallery" />
        }
      />
    </Route>
  )
);

export const InnerRoute: FC = () => {
  const setCurrentUser = useSetRecoilState(authAtom);

  useEffect(() => {
    if (!isCookies) return;

    getCurrentUser()
      .then((res): void => {
        setUserCookies(res);
        setCurrentUser(res.data.data);
      })
      .catch((e): void => {
        if (e.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          removeUserCookies();
          setCurrentUser(undefined);
        } else {
          throw e;
        }
      });
  }, []);

  return <RouterProvider router={router} />;
};
