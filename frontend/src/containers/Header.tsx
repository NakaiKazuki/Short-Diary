import { FC, useState, Fragment, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import styled from "styled-components";
import { useRecoilState } from "recoil";

// recoils
import { authAtom } from "../recoils/Auth";
import { drawerAtom } from "../recoils/Drawer";

// icons
import { MenuIcon } from "../components/icon";

// components
import { BaseButton } from "../components/shared_style";
import { UserMenu } from "../components/users/UserMenu";

// apis
import { deleteSession } from "../apis/users/sessions";

// images
import mainLogo from "../images/logo.png";

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

const style = {
  width: "1.7rem",
  height: "1.7rem",
  color: "limegreen",
  margin: "auto 0",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const Logo = styled.img`
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
  background-color: limegreen;
  color: white;
`;

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
        <Link to="/" data-testid="homeLink">
          <Logo src={mainLogo} alt="main logo" />
        </Link>
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
