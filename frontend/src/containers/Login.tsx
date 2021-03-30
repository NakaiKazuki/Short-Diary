import React, { VFC, Fragment, useState, useReducer, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {useHistory} from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUser';
import styled from 'styled-components';

// components
import { LoginForm} from '../components/Forms/Users';
import { Header } from '../components/Header';

// apis
import { createSession } from '../apis/users/sessions';

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from '../reducers/submit';

// helpers
import {
  isSignedIn,
  onSubmitLabel,
  isDisabled,
  signOutHandler } from '../helpers';

// responses
import { HTTP_STATUS_CODE } from '../constants';


// css
const LoginWrapper = styled.div`
  margin-top: 12vh;
`;

// 型
// Formから送信される情報
interface IFormValues {
  email: string;
  password: string;
}

// エラーメッセージ
interface IApiErrors {
  email?: Array<string>;
  password?: Array<string>;
  full_messages: Array<string>;
}

export const Login:VFC = () => {
  const history = useHistory();
  const [apiErrors, setErrorMessage] = useState<IApiErrors | undefined >(undefined);
  const [state, dispatch] = useReducer(submitReducer, initialState);
  const {currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { handleSubmit, errors, control } = useForm<IFormValues>();


  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING});
    createSession({
      email: formValues.email,
      password: formValues.password,
    })
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
      if (e.response.status === HTTP_STATUS_CODE.DATA_UNDEFINED) {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        setErrorMessage(e.response.data.errors);
      } else {
        throw e;
      }
    });
  };

  return(
    <Fragment>
      <Header
        isSignedIn={isSignedIn(currentUser)}
        handleSignOut={() => signOutHandler(currentUser!.headers,setCurrentUser,history)}
      />
      <LoginWrapper>
      <LoginForm
          ClickSubmit={() => handleSubmit(onSubmit)}
          isDisabled={() => isDisabled(state.postState)}
          onSubmitLabel={() => onSubmitLabel(state.postState, "Login!")}
          errors={errors}
          control={control}
          apiErrors={apiErrors}
        />
      </LoginWrapper>
    </Fragment>
  )
}