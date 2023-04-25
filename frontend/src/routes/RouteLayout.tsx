import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

// components
import { Header } from "../containers/Header";
import { Message } from "../containers/Message";
import { Drawer } from "../containers/Drawer";
import { Contact } from "../containers/Contact";
import { Footer } from "../containers/Footer";

const Main = styled.div`
  min-height: 100vh;
  margin-top: 5.5vh;
`;

export const RouteLayout: FC = () => {
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
