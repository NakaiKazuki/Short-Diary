import React, { FC, useContext, useState, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import styled from "styled-components";

//contexts
import { AuthContext } from "../contexts/Auth";
import { DrawerContext } from "../contexts/Drawer";

// icons
import { MenuIcon } from "./icons";

// components
import { BaseButton } from "../components/shared_style";
import { UserMenu } from "../components/users/UserMenu";

// helpers
import { isLoggedIn } from "../helpers";

// apis
import { deleteSession } from "../apis/users/sessions";

// images
import mainLogo from "../images/logo.png";

// css
const AppHeader = styled(AppBar)`
  height: auto;
`;

const MenuIconWrapper = styled.span`
  margin: auto 0.8rem auto 0;
  cursor: pointer;
`;

const MainLogo = styled.img`
  height: 2.5rem;
  padding: 1.15vh 0;
`;

const SignUpLink = styled(Link)`
  float: right;
  margin: 0 0 0 auto;
`;

const LoginLink = styled(Link)`
  float: right;
  margin: 0 0 0 1rem;
`;

const LinkItem = styled(BaseButton)`
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  border-style: none;
  background-color: royalblue;
  color: white;
`;

export const Header: FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { setOpenDrawer } = useContext(DrawerContext);

  // ユーザのログアウト処理
  const onSignOut = (): void => {
    deleteSession(currentUser!.headers)
      .then(() => {
        setCurrentUser(undefined);
        setAnchorEl(null);
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  };

  return (
    <AppHeader position="fixed" color="inherit" data-testid="header">
      <Toolbar>
        {isLoggedIn(currentUser) && (
          <MenuIconWrapper
            onClick={(): void => setOpenDrawer(true)}
            data-testid="menuIcon"
          >
            <MenuIcon />
          </MenuIconWrapper>
        )}
        <Link to="/" data-testid="homeLink">
          <MainLogo src={mainLogo} alt="main logo" />
        </Link>
        {isLoggedIn(currentUser) ? (
          <UserMenu
            anchorEl={anchorEl}
            currentUserName={currentUser!.data.name}
            onMenuOpen={(e: React.MouseEvent<HTMLElement>): void =>
              setAnchorEl(e.currentTarget)
            }
            onMenuClose={(): void => setAnchorEl(null)}
            onSignOut={onSignOut}
          />
        ) : (
          <Fragment>
            <SignUpLink to="/signup" data-testid="signUpLink">
              <LinkItem type="button">Sign Up</LinkItem>
            </SignUpLink>
            <LoginLink to="/login" data-testid="loginLink">
              <LinkItem type="button">Login</LinkItem>
            </LoginLink>
          </Fragment>
        )}
      </Toolbar>
    </AppHeader>
  );
};
