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

const LoginButton = styled(BaseButton)`
  height: 4vh;
  padding: 0 1rem;
  background-color: royalblue;
  color: white;
  border-style: none;
  text-align: right;
  margin: 0 0 0 auto;
  border-radius: 5%;
`;

interface HeaderProps {
  loginDialogOpenHandler(): void;
}

export const Header:VFC<HeaderProps> = ({
  loginDialogOpenHandler
}) => {
  return (
    <AppBar data-testid="header" position="fixed" color="inherit">
      <Toolbar>
        <Link data-testid="homeLink" to ={ '/' } >
           <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <LoginButton
          type="button"
          data-testid="loginButton"
          onClick={() => loginDialogOpenHandler() }
        >
          ログイン
        </LoginButton>
      </Toolbar>
    </AppBar>
  )
}
