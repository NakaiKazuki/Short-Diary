import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

// components
import { Header } from "../containers/Header";
import { Message } from "../containers/Message";
import { Drawer } from "../containers/Drawer";
import { Contact } from "../containers/Contact";
import { Footer } from "../containers/Footer";
import BackImage from "../images/sample.jpg";
const Main = styled.div`
  min-height: 100vh;
  margin-top: 5.5vh;
  text-size-adjust: 100%;
   -webkit-text-size-adjust: 100%;
   background-image: url(${BackImage});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
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
