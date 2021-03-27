import React, { VFC, Fragment, useState, useReducer } from 'react';
import { useForm ,Controller} from 'react-hook-form';
// import {useHistory} from "react-router-dom";
import styled from 'styled-components';

// components
import { Header } from '../components/Header';
import { FormTitleWrapper, FormLabelWrapper ,FormItemsWrapper,
         FormItemWrapper, FormSubmitWrapper,FormErrorMessageWrapper}
         from '../components/Forms/Users';

// apis
import { postSession } from '../apis/users/sessions';

// responses
import { HTTP_STATUS_CODE, REQUEST_STATE } from '../constants';

// reducers
import {
  initialState,
  loginActionTypes,
  loginReducer,
} from '../reducers/login';

// css
const LoginWrapper = styled.div`
  margin-top: 12vh;
`;

// 型
// Formから送信される情報
interface FormValues {
  email: string;
  password: string;
}

// エラーメッセージ
interface ApiErrors {
  email?: Array<string>;
  password?: Array<string>;
  full_messages: Array<string>;
}

export const Login:VFC = () => {
  // const history = useHistory();
  const { handleSubmit, errors, control } = useForm<FormValues>();
  const [apiError, setErrorMessage] = useState<ApiErrors>();
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const onSubmit = (formValues: FormValues) => {
    dispatch({ type: loginActionTypes.POSTING});
    postSession({
      email: formValues.email,
      password: formValues.password,
    })
    .then(data => {
      dispatch({ type: loginActionTypes.POST_SUCCESS });
      console.log(data);
      // history.push("/")
    })
    .catch(e => {
      if (e.response.status === HTTP_STATUS_CODE.VALIDATION_FAILED) {
        dispatch({ type: loginActionTypes.POST_INITIAL });
        setErrorMessage(e.response.data.errors)
      } else {
        throw e;
      }
    });
  };

  const onSubmitLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return "送信中...";
      case REQUEST_STATE.OK:
        return "送信が完了しました";
      default:
        return "Login!";
    }
  };

  // 送信中とエラーなく送信完了した場合はtrueを返す
  const isDisabled = () => {
    return state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK
  }

  return(
    <Fragment>
      <Header/>
      <LoginWrapper>
      <FormTitleWrapper>Login</FormTitleWrapper>
      <FormItemsWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormLabelWrapper>Email:</FormLabelWrapper>
        {errors.email &&
          <FormErrorMessageWrapper>1文字以上、255文字以内で入力してください</FormErrorMessageWrapper>
        }
        {apiError?.email && apiError.email.map((message: string, index: number) =>
          <FormErrorMessageWrapper key={`email-${index}`}>{`メールアドレス${message}`}</FormErrorMessageWrapper>
        )}
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
          <FormErrorMessageWrapper>6文字以上、128文字以内で入力してください</FormErrorMessageWrapper>
        }
        {apiError?.password && apiError.password.map((message: string, index: number) =>
          <FormErrorMessageWrapper key={`password-${index}`}>{`パスワード${message}`}</FormErrorMessageWrapper>
        )}
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
        <FormSubmitWrapper type="submit" disabled={isDisabled()}>{onSubmitLabel()}</FormSubmitWrapper>
        </FormItemsWrapper>
      </LoginWrapper>
    </Fragment>
  )
}