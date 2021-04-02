import React, { VFC ,useEffect, useContext } from 'react';
import styled from 'styled-components';

// contexts
import { CurrentUserContext } from '../../contexts/CurrentUser';

// apis
import { fetchHome } from '../../apis/home';

// css
const LoginHomeWrapper = styled.div`
  width: 100vw;
  height: 80vh;
  margin-top: 6.6vh;
`;

export const LoginHome: VFC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  useEffect((): void => {
    fetchHome(currentUser!.headers)
    .then(data =>
      console.log(data)
    )
  },[currentUser]);

  return (
    <LoginHomeWrapper>
      <h1>Loginしてますねぇ</h1>
    </LoginHomeWrapper>
  );
}
