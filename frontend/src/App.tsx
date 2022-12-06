import { FC } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// routes
import { Route } from "react-router-dom";
import { RouteLayout } from "./routes/RouteLayout";

// cotexts
import { AuthProvider } from "./contexts/Auth";
import { MessageProvider } from "./contexts/Message";
import { DrawerProvider } from "./contexts/Drawer";
import { ContactProvider } from "./contexts/Contact";

import { LogoutHome } from "./containers/LogoutHome";
import { LoginHome } from "./containers/LoginHome";
import { SignUp } from "./containers/SignUp";
import { Login } from "./containers/Login";
import { UserEdit } from "./containers/UserEdit";
import { PhotoGallery } from "./containers/PhotoGallery";
import { GuestRoute } from "./routes/GuestRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { LoggedInRoute } from "./routes/LoggedInRoute";

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

const App: FC = () => {
  return (
    <ContactProvider>
      <AuthProvider>
        <DrawerProvider>
          <MessageProvider>
            <RouterProvider router={router} />
          </MessageProvider>
        </DrawerProvider>
      </AuthProvider>
    </ContactProvider>
  );
};

export default App;
