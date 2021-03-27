import React, { VFC, Fragment, useState, useReducer } from 'react';
import { useForm ,Controller} from 'react-hook-form';
import {useHistory} from "react-router-dom";
import styled from 'styled-components';

// components
import { Header } from '../components/Header';
import { FormTitleWrapper, FormLabelWrapper ,FormItemsWrapper,
         FormItemWrapper, FormSubmitWrapper,FormErrorMessageWrapper}
         from '../components/Forms/Users';

// apis
import { postRegistration } from '../apis/users/registrations';

// responses
import { HTTP_STATUS_CODE, REQUEST_STATE } from '../constants';

// reducers
import {
  initialState,
  signUpActionTypes,
  signUpReducer,
} from '../reducers/signUp';

// css
const SignUpWrapper = styled.div`
  margin-top: 12vh;
`;

// 型
// Formから送信される情報
interface FormValues{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// エラーメッセージ
interface ApiErrors {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  full_messages: Array<string>;
}

export const SignUp:VFC = () => {
  const history = useHistory();
  const { handleSubmit, errors, control } = useForm<FormValues>();
  const [apiError, setErrorMessage] = useState<ApiErrors>();
  const [state, dispatch] = useReducer(signUpReducer, initialState);

  const onSubmit = (formValues: FormValues) => {
    dispatch({ type: signUpActionTypes.POSTING});
    postRegistration({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
    })
    .then(data => {
      dispatch({ type: signUpActionTypes.POST_SUCCESS });
      console.log(data);
      history.push("/")
    })
    .catch(e => {
      if (e.response.status === HTTP_STATUS_CODE.VALIDATION_FAILED) {
        dispatch({ type: signUpActionTypes.POST_INITIAL });
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
        return "Sign Up!";
    }
  };

  // 送信中とエラーなく送信完了した場合はtrueを返す
  const isDisabled = () => {
    return state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK
  }

  return(
    <Fragment>
      <Header/>
      <SignUpWrapper>
        <FormTitleWrapper>Sign Up</FormTitleWrapper>
        <FormItemsWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormLabelWrapper>Name:</FormLabelWrapper>
          {errors.name &&
            <FormErrorMessageWrapper>1文字以上、50文字以内で入力してください</FormErrorMessageWrapper>
          }
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true, maxLength: 50 }}
            as={
              <FormItemWrapper
                autoFocus
                type="text"
                fullWidth
                data-testid="nameArea"
              />
            }
          />

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

          <FormLabelWrapper>パスワード(6文字以上):</FormLabelWrapper>
          {errors.password &&
            <FormErrorMessageWrapper>6文字以上、128文字以内で入力してください</FormErrorMessageWrapper>
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

          <FormLabelWrapper>確認用パスワード:</FormLabelWrapper>
          {errors.password &&
            <FormErrorMessageWrapper>パスワードと同じ内容を入力してください</FormErrorMessageWrapper>
          }
          {apiError?.password_confirmation && apiError.password_confirmation.map((message: string, index: number) =>
            <FormErrorMessageWrapper key={`password_confirmation-${index}`}>{`確認用パスワード${message}`}</FormErrorMessageWrapper>
          )}
          <Controller
            name="password_confirmation"
            control={control}
            defaultValue=""
            rules={{required: true, minLength: 6}}
            as={
              <FormItemWrapper
                type="password"
                fullWidth
                data-testid="passwordConfirmationArea"
              />
            }
          />
          <FormSubmitWrapper type="submit" disabled={isDisabled()}>{onSubmitLabel()}</FormSubmitWrapper>
        </FormItemsWrapper>
      </SignUpWrapper>
    </Fragment>
  )
}