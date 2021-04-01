import React, { VFC ,useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// contexts
import { CurrentUserContext } from '../../contexts/CurrentUser';

// apis
import { fetchHome } from '../../apis/home';

export const LoginHome: VFC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  useEffect((): void => {
    fetchHome(currentUser!.headers)
    .then(data =>
      console.log(data)
    )
  },[currentUser]);

  return (
    <h1> ログインユーザ専用のホームでしてよ！</h1>
  );
}
