import React, {VFC, useContext, useState} from 'react';
import {useHistory, Link } from 'react-router-dom';
import {AppBar, Toolbar } from '@material-ui/core';
import styled from 'styled-components';

//contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// components
import { BaseButton } from '../components/shared_style';
import { UserMenu } from '../components/users/UserMenu';
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

const LoginButton = styled(BaseButton)`
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  border-style: none;
  background-color: royalblue;
  color: white;
`;

export const Header:VFC = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);

  // ユーザのログアウト処理
  const onSignOut = (): void =>{
    deleteSession(currentUser!.headers)
    .then(() => {
      setCurrentUser(undefined);
      setAnchorEl(null);
      history.push('/');
    })
    .catch(e => {
      throw e;
    });
  };

  return (
    <AppHeader position='fixed' color='inherit' data-testid='header' >
      <Toolbar>
        <Link to ={'/'} data-testid='homeLink'>
           <MainLogoImage src={MainLogo} alt='main logo' />
        </Link>
        {
          isLoggedIn(currentUser) ?
          <UserMenu
            anchorEl={anchorEl}
            onMenuOpen={(e: React.MouseEvent<HTMLElement>): void => setAnchorEl(e.currentTarget)}
            onMenuClose={(): void => setAnchorEl(null)}
            onSignOut={onSignOut}
          />
        :
        <SessionLink
          to={'/login'}
        >
          <LoginButton
            type='button'
            data-testid='loginButton'
          >
            Login
          </LoginButton>
        </SessionLink>
        }
      </Toolbar>
    </AppHeader>
  )
}
