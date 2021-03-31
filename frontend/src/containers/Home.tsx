import React, { VFC, Fragment , useContext} from 'react';

//contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// components
import { LogoutHome } from './homes/LogoutHome';
import { LoginHome } from './homes/LoginHome';

// helpers
import {
  isSignedIn,
} from '../helpers';

export const Home:VFC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return(
    <Fragment>
      {
        isSignedIn(currentUser) ?
        <LoginHome />
      :
        <LogoutHome />
      }
    </Fragment>
  );
}