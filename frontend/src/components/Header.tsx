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

const LoginLink = styled(Link)`
  float: right;
  margin: 0 0 0 auto;
`;

const LoginButton = styled(BaseButton)`
  height: 2.5rem;
  padding: 0 1rem;
  background-color: royalblue;
  color: white;
  border-style: none;
  border-radius: 5%;
  font-size: 1.2rem;
`;

interface HeaderProps {
}

export const Header:VFC<HeaderProps> = () => {
  return (
    <AppBar data-testid="header" position="fixed" color="inherit">
      <Toolbar>
        <Link data-testid="homeLink" to ={'/'} >
           <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <LoginLink
          to={'/login'}
          data-testid="loginLink"
        >
          <LoginButton
            type="button"
            data-testid="loginButton"
          >
            Login
          </LoginButton>
        </LoginLink>
      </Toolbar>
    </AppBar>
  )
}
