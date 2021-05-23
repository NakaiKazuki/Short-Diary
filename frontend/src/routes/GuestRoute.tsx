import { VFC, useContext } from 'react';
import { Redirect } from 'react-router-dom';

// contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// helpers
import { isLoggedIn } from '../helpers';

interface IGuestRouteProps {
  exact: true;
  path: string;
  children: JSX.Element
}

export const GuestRoute:VFC<IGuestRouteProps> = ({ children }) => {
  const {currentUser} = useContext(CurrentUserContext);

  return (
    isLoggedIn(currentUser) ? <Redirect to='/' /> : { ...children }
  );
};