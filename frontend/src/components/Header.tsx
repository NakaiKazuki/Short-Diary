import React, { VFC } from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';

// images
import MainLogo from '../images/logo.png';

// css
const MainLogoImage = styled.img`
  height: 2.5rem;
`;

const ButtonWrapper = styled.div`
  margin: 0 0 0 auto;
`;

export const Header:VFC = () => {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <Link to ={ '/' } >
           <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <ButtonWrapper>
          <Button variant="contained" color="primary">
            ログイン
          </Button>
        </ButtonWrapper>
      </Toolbar>
    </AppBar>
  )
}
