import React, {
  VFC,
  Fragment,
  useContext} from 'react';

//contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// components
import { LogoutHome, LoginHome } from './homes';

// helpers
import { isLoggedIn } from '../helpers';

export const Home:VFC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return(
    <Fragment>
      {
        isLoggedIn(currentUser) ?
        <LoginHome />
      :
        <LogoutHome />
      }
    </Fragment>
  );
}