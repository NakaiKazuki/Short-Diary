import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
// hooks
import { useTracking } from "../hooks/useTracking";

// components
import { Header } from "../containers/Header";
import { Message } from "../containers/Message";
import { Drawer } from "../containers/Drawer";
import { Contact } from "../containers/Contact";
import { Footer } from "../containers/Footer";

const Main = styled.div`
  min-height: 81vh;
  margin-top: 5.5vh;
`;

export const RouteLayout: FC = () => {
  useTracking(process.env.REACT_APP_GA_UA);
  useTracking(process.env.REACT_APP_GA_G);
  return (
    <Fragment>
      <Header />
      <Main>
        <Message />
        <Drawer />
        <Contact />
        <Outlet />
      </Main>
      <Footer />
    </Fragment>
  );
};
