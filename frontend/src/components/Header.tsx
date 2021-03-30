import React, { VFC } from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
// images
import MainLogo from '../images/logo.png';

// components
import { BaseButton } from './shared_style';

const MainLogoImage = styled.img`
  height: 2.5rem;
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

interface IHeader {
  isSignedIn : boolean;
  signOut(): void;
}

export const Header:VFC<IHeader> = ({ isSignedIn ,signOut}) => {
  return (
    <AppBar data-testid="header" position="fixed" color="inherit">
      <Toolbar>
        <Link data-testid="homeLink" to ={'/'} >
           <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        {
          isSignedIn ?
          <LogoutButton type="button" onClick={() => signOut()}>Logout</LogoutButton>
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
    </AppBar>
  )
}
