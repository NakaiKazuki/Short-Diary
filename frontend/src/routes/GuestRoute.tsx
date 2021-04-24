import { VFC, useContext } from 'react';
import { Redirect } from 'react-router-dom';

// contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// helpers
import { isLoggedIn } from '../helpers';

interface GuestRouteProps {
  exact: true;
  path: string;
  children: JSX.Element
}

export const GuestRoute:VFC<GuestRouteProps> = ({ children }) => {
  const {currentUser} = useContext(CurrentUserContext);

  return (
    isLoggedIn(currentUser) ? <Redirect to='/' /> : { ...children }
  );
};