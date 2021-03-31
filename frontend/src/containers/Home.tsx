import React, { VFC, Fragment , useContext} from 'react';
import { useHistory } from "react-router-dom";

//contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// components
import { Header } from '../components/Header';
import { LogoutHome } from './homes/LogoutHome';
import { LoginHome } from './homes/LoginHome';

// helpers
import {
  isSignedIn,
  signOutHandler
} from '../helpers';

export const Home:VFC = () => {
  const { currentUser ,setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();

  return(
    <Fragment>
      <Header
        isSignedIn={isSignedIn(currentUser)}
        handleSignOut={() => signOutHandler(currentUser!.headers, setCurrentUser, history)}
      />
      {
        isSignedIn(currentUser) ?
        <LoginHome />
      :
        <LogoutHome />
      }
    </Fragment>
  );
}