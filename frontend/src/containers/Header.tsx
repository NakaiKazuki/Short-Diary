import { FC, useState, Fragment, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import styled from "styled-components";
import { useRecoilState } from "recoil";

// atoms
import { authAtom } from "../atoms/Auth";
import { drawerAtom } from "../atoms/Drawer";

// icons
import { MenuIcon } from "../components/icon";

// components
import { BaseButton } from "../components/shared_style";
import { UserMenu } from "../components/users/UserMenu";

// apis
import { deleteSession } from "../apis/users/sessions";

// helpers
import { removeUserCookies } from "../helpers";

// css
const AppHeader = styled(AppBar)`
  height: auto;
`;

const Icon = styled.span`
  position: relative;
  margin: auto 0.8rem auto 0;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  &:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }
`;

const Logo = styled(Link)`
  padding: 1.15vh 0;
  font-size: 1.7rem;
  color: limegreen;
  font-weight: bold;
  font-family: Comic Sans MS;
  text-decoration: none;
  @media screen and (max-width: 480px) {
    font-size: 1.3rem;
  }
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
  border: 2px solid limegreen;
  background-color: white;
  color: limegreen;
  :hover {
    background-color: limegreen;
    color: white;
  }
`;

const style = {
  width: "1.7rem",
  height: "1.7rem",
  margin: "auto 0",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const Header: FC = () => {
  const [currentUser, setCurrentUser] = useRecoilState(authAtom);
  const [open, setOpenDrawer] = useRecoilState(drawerAtom);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // ユーザのログアウト処理
  const onSignOut = async (): Promise<void> => {
    await deleteSession()
      .then(() => {
        setAnchorEl(null);
        setCurrentUser(undefined);
        removeUserCookies();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  };

  return (
    <AppHeader position="fixed" color="inherit" data-testid="header">
      <Toolbar>
        {currentUser && (
          <Icon
            onClick={(): void => setOpenDrawer(!open)}
            data-testid="menuIcon"
          >
            <MenuIcon sx={style} />
          </Icon>
        )}
        <Logo to="/" data-testid="homeLink">
          Short Diary
        </Logo>
        {currentUser ? (
          <UserMenu
            anchorEl={anchorEl}
            userName={currentUser.name}
            onMenuOpen={(e: MouseEvent<HTMLElement>): void =>
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
