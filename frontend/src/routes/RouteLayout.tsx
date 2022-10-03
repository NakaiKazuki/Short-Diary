import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";

// hooks
import { useTracking } from "../hooks/useTracking";

// components
import { Header } from "../containers/Header";
import { Message } from "../containers/Message";
import { Drawer } from "../containers/Drawer";
import { Contact } from "../containers/Contact";
import { Footer } from "../containers/Footer";

export const RouteLayout: FC = () => {
  useTracking(process.env.REACT_APP_GA_UA);
  useTracking(process.env.REACT_APP_GA_G);
  return (
    <Fragment>
      <Header />
      <Message />
      <Drawer />
      <Contact />
      <Outlet />
      <Footer />
    </Fragment>
  );
};
