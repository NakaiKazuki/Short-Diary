import { FC, useEffect, useState, Fragment } from "react";
import { useSetRecoilState } from "recoil";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";

// components
import { Load } from "../utils/Load";
import { Header } from "../containers/Header";
import { Message } from "../utils/Message";
import { Drawer } from "../containers/Drawer";
import { Contact } from "../containers/Contact";
import { Footer } from "../containers/Footer";

// atoms
import { authAtom } from "../atoms";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// apis
import { getCurrentUser } from "../apis/users/sessions";

// helpers
import { removeUserCookies, setUserCookies } from "../helpers";

const Container = styled.div`
  width: 100%;
  text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  background-image: url("images/back.jpg");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
`;

const getCookie = (name: string) => Cookies.get(name);
const isHeaders = !(
  getCookie("access-token") &&
  getCookie("client") &&
  getCookie("uid")
);

export const RouteLayout: FC = () => {
  const setCurrentUser = useSetRecoilState(authAtom);
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    if (isHeaders) return;

    getCurrentUser()
      .then((res): void => {
        setUserCookies(res);
        setCurrentUser(res.data.data);
      })
      .catch((e): void => {
        if (e.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          removeUserCookies();
          setCurrentUser(undefined);
        } else {
          throw e;
        }
      });
  }, []);

  setTimeout(() => {
    setShowComponent(true);
  }, 2500);

  return (
    <Container>
      {showComponent ? (
        <Fragment>
          <Header />
          <Message />
          <Drawer />
          <Contact />
          <Outlet />
          <Footer />
        </Fragment>
      ) : (
        <Load />
      )}
    </Container>
  );
};
