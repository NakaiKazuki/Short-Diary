import React, { VFC, Fragment, useState, useReducer, useContext } from 'react';
import { useForm ,Controller} from 'react-hook-form';
import {useHistory} from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUser';
import styled from 'styled-components';

// components
import { FormTitleWrapper, FormLabelWrapper ,FormWrapper,
         FormItemWrapper, FormSubmitWrapper,FormErrorMessageWrapper}
         from '../components/Forms/Users';
import { Header } from '../components/Header';

// apis
import { createSession } from '../apis/users/sessions';
import { deleteSession } from '../apis/users/sessions';

// reducers
import {
  initialState,
  loginActionTypes,
  loginReducer,
} from '../reducers/login';

// helpers
import { isSignedIn } from '../helpers';

// responses
import { HTTP_STATUS_CODE, REQUEST_STATE } from '../constants';


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
type ApiErrors = Array<string>;

export const Login:VFC = () => {
  const history = useHistory();
  const [apiError, setErrorMessage] = useState<ApiErrors | undefined >(undefined);
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const {currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { handleSubmit, errors, control } = useForm<IFormValues>();

  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: loginActionTypes.POSTING});
    createSession({
      email: formValues.email,
      password: formValues.password,
    })
    .then(res => {
      dispatch({ type: loginActionTypes.POST_SUCCESS });
      setCurrentUser({
        ...currentUser,
        ...res.data,
        headers: res.headers,
      })
      history.push("/")
    })
    .catch(e => {
      if (e.response.status === HTTP_STATUS_CODE.DATA_UNDEFINED) {
        dispatch({ type: loginActionTypes.POST_INITIAL });
        setErrorMessage(e.response.data.errors);
      } else {
        throw e;
      }
    });
  };

  const onSubmitLabel = (): string => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return "送信中...";
      case REQUEST_STATE.OK:
        return "送信完了!";
      default:
        return "Login!";
    };
  };

  // 送信中とエラーなく送信完了した場合はtrueを返す
  const isDisabled = (): boolean => {
    return state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK
  };

  const signOut = () =>{
    deleteSession(currentUser!.headers)
    .then(() => {
      setCurrentUser(undefined)
      history.push("/");
    })
    .catch(e => {
      throw e;
    });
  }


  return(
    <Fragment>
      <Header isSignedIn={isSignedIn(currentUser)} signOut={signOut} />
      <LoginWrapper>
        <FormTitleWrapper>Login</FormTitleWrapper>

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          {apiError && apiError.map((message: string, index: number) =>
            <FormErrorMessageWrapper key={`apiError-${index}`}>{message}</FormErrorMessageWrapper>
          )}

          <FormLabelWrapper>Email:</FormLabelWrapper>
          {errors.email &&
            <FormErrorMessageWrapper>登録したメールアドレスを入力してください</FormErrorMessageWrapper>
          }
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true , maxLength: 255}}
            as={
              <FormItemWrapper
                type="email"
                fullWidth
                data-testid="emailArea"
              />
            }
          />

          <FormLabelWrapper>パスワード:</FormLabelWrapper>
          {errors.password &&
            <FormErrorMessageWrapper>正しいパスワードを入力してください</FormErrorMessageWrapper>
          }
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true,minLength: 6, maxLength: 128}}
            as={
              <FormItemWrapper
                type="password"
                fullWidth
                data-testid="passwordArea"
              />
            }
          />

          <FormSubmitWrapper
            type="submit"
            disabled={isDisabled()}>{onSubmitLabel()}
          </FormSubmitWrapper>

        </FormWrapper>
      </LoginWrapper>
    </Fragment>
  )
}