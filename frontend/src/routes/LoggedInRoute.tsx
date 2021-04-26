import { VFC, useContext} from 'react';
//contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// helpers
import { isLoggedIn } from '../helpers';

interface LoggedInRouteProps{
  exact: true;
  path: string;
  login: JSX.Element;
  logout: JSX.Element;
}

export const LoggedInRoute:VFC<LoggedInRouteProps> = ({
  login,
  logout,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  return isLoggedIn(currentUser) ? { ...login } : { ...logout };
}