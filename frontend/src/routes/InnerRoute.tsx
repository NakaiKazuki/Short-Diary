import { FC } from "react";
import { BrowserRouter, Routes } from "react-router-dom";

// routes
import { Route } from "react-router-dom";
import { RouteLayout } from "./RouteLayout";

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

export const InnerRoute: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
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
              <GuestRoute
                jsxElement={<ResetPassword />}
                title="Reset Password"
              />
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
            element={
              <PrivateRoute jsxElement={<UserEdit />} title="UserEdit" />
            }
          />
          <Route
            path="/photoGalley"
            element={
              <PrivateRoute
                jsxElement={<PhotoGallery />}
                title="PhotoGallery"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
