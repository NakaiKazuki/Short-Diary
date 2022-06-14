import { FC } from "react";
import { Routes, Route } from "react-router-dom";

// routes
import { GuestRoute } from "./GuestRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LoggedInRoute } from "./LoggedInRoute";

// hooks
import { useTracking } from "../hooks/useTracking";

// components
import { LogoutHome } from "../containers/LogoutHome";
import { LoginHome } from "../containers/LoginHome";
import { SignUp } from "../containers/SignUp";
import { Login } from "../containers/Login";
import { UserEdit } from "../containers/UserEdit";
import { PhotoGallery } from "../containers/PhotoGallery";

export const InnnerComponent: FC = () => {
  useTracking(process.env.REACT_APP_GA_UA);
  useTracking(process.env.REACT_APP_GA_G);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoggedInRoute login={<LoginHome />} logout={<LogoutHome />} />
        }
      />
      <Route path="/signup" element={<GuestRoute children={<SignUp />} />} />
      <Route path="/login" element={<GuestRoute children={<Login />} />} />
      <Route
        path="/userEdit"
        element={<PrivateRoute children={<UserEdit />} />}
      />
      <Route
        path="/photoGalley"
        element={<PrivateRoute children={<PhotoGallery />} />}
      />
    </Routes>
  );
};
