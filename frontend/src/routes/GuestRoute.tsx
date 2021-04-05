import React, { VFC, useContext } from 'react';
import { Redirect } from "react-router-dom";

// contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// helpers
import { isLoggedIn } from '../helpers';

export const GuestRoute:VFC<any> = ({ children }) => {
  const {currentUser} = useContext(CurrentUserContext);

  return (
    isLoggedIn(currentUser) ? <Redirect to="/" /> : { ...children }
  );
};