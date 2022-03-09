import { VFC } from "react";
import { Routes, Route } from "react-router-dom";

// cotexts
import { AuthProvider } from "../contexts/Auth";
import { MessageProvider } from "../contexts/Message";

// routes
import { GuestRoute } from "./GuestRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LoggedInRoute } from "./LoggedInRoute";

// hooks
import { useTracking } from "../hooks/useTracking";

// components
import { Header } from "../containers/Header";
import { Message } from "../containers/Message";
import { LogoutHome } from "../containers/LogoutHome";
import { LoginHome } from "../containers/LoginHome";
import { SignUp } from "../containers/SignUp";
import { Login } from "../containers/Login";
import { UserEdit } from "../containers/UserEdit";

export const InnnerComponent: VFC = () => {
  useTracking(process.env.REACT_APP_GA_UA);
  useTracking(process.env.REACT_APP_GA_G);

  return (
    <AuthProvider>
      <MessageProvider>
        <Header />
        <Message />
        <Routes>
          <Route
            path="/"
            element={
              <LoggedInRoute login={<LoginHome />} logout={<LogoutHome />} />
            }
          />
          <Route
            path="/signup"
            element={<GuestRoute children={<SignUp />} />}
          />
          <Route path="/login" element={<GuestRoute children={<Login />} />} />
          <Route
            path="/userEdit"
            element={<PrivateRoute children={<UserEdit />} />}
          />
        </Routes>
      </MessageProvider>
    </AuthProvider>
  );
};
