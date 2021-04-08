import React, {
  VFC,
  useContext} from 'react';
import {
  useHistory,
  Link } from "react-router-dom";
import {
  AppBar,
  Toolbar } from '@material-ui/core';
import styled from 'styled-components';

//contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// components
import { BaseButton } from '../components/shared_style';

// helpers
import { isLoggedIn } from '../helpers';

// apis
import { deleteSession } from '../apis/users/sessions';

// images
import MainLogo from '../images/logo.png';

// css
const AppHeader = styled(AppBar)`
  height:auto;
`;

const MainLogoImage = styled.img`
  height: 2.5rem;
  padding: 1.15vh 0;
`;

const SessionLink = styled(Link)`
  float: right;
  margin: 0 0 0 auto;
`;

const SessionButton = styled(BaseButton)`
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1.2rem;
`;

const LoginButton = styled(SessionButton)`
  border-style: none;
  background-color: royalblue;
  color: white;
`;

const LogoutButton = styled(SessionButton)`
  float: right;
  margin: 0 0 0 auto;
  border: .0125rem solid royalblue;
  background-color: white;
  color: royalblue;
  :hover {
    background-color: royalblue;
    color: white;
  }
`;

export const Header:VFC = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // ユーザのログアウト処理
  const onSignOut = (): void =>{
    deleteSession(currentUser!.headers)
    .then(() => {
      setCurrentUser(undefined)
      history.push("/");
    })
    .catch(e => {
      throw e;
    });
  };

  return (
    <AppHeader data-testid="header" position="fixed" color="inherit" >
      <Toolbar>
        <Link data-testid="homeLink" to ={'/'} >
           <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        {
          isLoggedIn(currentUser) ?
          <LogoutButton type="button" onClick={ () => onSignOut()}>Logout</LogoutButton>
        :
        <SessionLink
          to={'/login'}
          data-testid="loginLink"
        >
          <LoginButton
            type="button"
            data-testid="loginButton"
          >
            Login
          </LoginButton>
        </SessionLink>
        }
      </Toolbar>
    </AppHeader>
  )
}
