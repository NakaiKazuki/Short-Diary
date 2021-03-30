import React, { VFC, Fragment ,useEffect, useContext, useReducer} from 'react';
import {useHistory} from "react-router-dom";

//contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// components
import { Header } from '../components/Header';
import { LogoutHome } from '../components/homes/LogoutHome';
import { LoginHome } from '../components/homes/LoginHome';

// apis
import { fetchHome } from '../apis/home';
import { newGuestSession } from '../apis/users/sessions';


// helpers
import {
  isSignedIn,
  onSubmitLabel,
  isDisabled,
  signOutHandler } from '../helpers';

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from '../reducers/submit';

export const Home:VFC = () => {
  const { currentUser ,setCurrentUser } = useContext(CurrentUserContext);
  const [ state, dispatch ] = useReducer(submitReducer, initialState);
  const history = useHistory();

  useEffect((): void => {
    fetchHome()
    .then(data =>
      console.log(data)
    )
  },[]);

  // LogutHomeに渡す関数
  const guestLoginHandler = (): void => {
    dispatch({ type: submitActionTypes.POSTING});
    newGuestSession()
    .then(res => {
      dispatch({ type: submitActionTypes.POST_SUCCESS });
      setCurrentUser({
        ...currentUser,
        ...res.data,
        headers: res.headers,
      })
      history.push("/")
    })
    .catch(e => {
      throw e;
    });
  };

  return(
    <Fragment>
      <Header
        isSignedIn={isSignedIn(currentUser)}
        handleSignOut={() => signOutHandler(currentUser!.headers,setCurrentUser,history)}
      />
      {
        isSignedIn(currentUser) ?
        <LoginHome />
      :
        <LogoutHome
          handleGuestLogin={guestLoginHandler}
          submitLabel={() => onSubmitLabel(state.postState, "ゲストログイン")}
          isDisabled={() => isDisabled(state.postState)}
        />
      }
    </Fragment>
  );
}