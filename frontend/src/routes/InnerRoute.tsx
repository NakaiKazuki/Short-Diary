import { FC } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

// routes
import { RouteLayout } from "./RouteLayout";

// components
import { About } from "../containers/About";
import { FreeRoute } from "./FreeRoute";
import { GuestRoute } from "../routes/GuestRoute";
import { LoggedInRoute } from "./LoggedInRoute";
import { Login } from "../containers/Login";
import { LoginHome } from "../containers/LoginHome";
import { LogoutHome } from "../containers/LogoutHome";
import { NewPassword } from "../containers/NewPassword";
import { PhotoGallery } from "../containers/PhotoGallery";
import { PrivateRoute } from "../routes/PrivateRoute";
import { ResetPassword } from "../containers/ResetPassword";
import { SignUp } from "../containers/SignUp";
import { UserEdit } from "../containers/UserEdit";

export const InnerRoute: FC = () => {
  return (
    <Router>
      <Routes location={location} key={location.pathname}>
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
          <Route
            path="/about"
            element={<FreeRoute jsxElement={<About />} title="About" />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
