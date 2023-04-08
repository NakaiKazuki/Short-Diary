import { FC, useEffect, useContext } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Cookies from "js-cookie";

// routes
import { Route } from "react-router-dom";
import { RouteLayout } from "./RouteLayout";

// cotexts
import { MessageProvider } from "../contexts/Message";
import { DrawerProvider } from "../contexts/Drawer";
import { ContactProvider } from "../contexts/Contact";
import { AuthContext } from "../contexts/Auth";

// components
import { LogoutHome } from "../containers/LogoutHome";
import { LoginHome } from "../containers/LoginHome";
import { SignUp } from "../containers/SignUp";
import { Login } from "../containers/Login";
import { UserEdit } from "../containers/UserEdit";
import { PhotoGallery } from "../containers/PhotoGallery";
import { GuestRoute } from "../routes/GuestRoute";
import { PrivateRoute } from "../routes/PrivateRoute";
import { LoggedInRoute } from "./LoggedInRoute";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// apis
import { getCurrentUser } from "../apis/users/sessions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route
        index
        element={
          <LoggedInRoute login={<LoginHome />} logout={<LogoutHome />} />
        }
      />
      <Route path="/signup" element={<GuestRoute jsxElement={<SignUp />} />} />
      <Route path="/login" element={<GuestRoute jsxElement={<Login />} />} />
      <Route
        path="/userEdit"
        element={<PrivateRoute jsxElement={<UserEdit />} />}
      />
      <Route
        path="/photoGalley"
        element={<PrivateRoute jsxElement={<PhotoGallery />} />}
      />
    </Route>
  )
);

export const InnerRoute: FC = () => {
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (
      !Cookies.get("access-token") ||
      !Cookies.get("client") ||
      !Cookies.get("uid")
    ) {
      return;
    } else {
      getCurrentUser()
        .then((res): void => {
          Cookies.set("uid", res.headers["uid"]);
          Cookies.set("client", res.headers["client"]);
          Cookies.set("access-token", res.headers["access-token"]);
          console.log(res);
          setCurrentUser(res.data.current_user);
        })
        .catch((e): void => {
          if (e.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
            Cookies.remove("uid");
            Cookies.remove("client");
            Cookies.remove("access-token");
            setCurrentUser(undefined);
          } else {
            console.log(e);
            throw e;
          }
        });
    }
  }, []);

  return (
    <ContactProvider>
      <DrawerProvider>
        <MessageProvider>
          <RouterProvider router={router} />
        </MessageProvider>
      </DrawerProvider>
    </ContactProvider>
  );
};
