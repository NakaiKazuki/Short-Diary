import React, { VFC, useState, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

// components
import {
  FormArea,
  FormSubmit,
  FormLinks,
  FormTitle,
  FormWrapper,
} from '../components/users';

// apis
import { postRegistration } from '../apis/users/registrations';

// responses
import { HTTP_STATUS_CODE } from '../constants';

// formitemsinfo
import {
  signUpFormInfo,
  signUpLinkInfo } from '../formInfo';

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from '../reducers/submit';

// helpers
import {
  onSubmitLabel,
  isDisabled,
} from '../helpers';

// css
const SignUpWrapper = styled.div`
  width: 100vw;
  height: 80vh;
  margin-top: 6.6vh;
  padding-top: 5.4vh;
`;

// 型
// Formから送信される情報
interface IFormValues{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// エラーメッセージ
type TApiError = Array<string>;
interface IApiErrors {
  name?: TApiError;
  email?: TApiError;
  password?: TApiError;
  password_confirmation?: TApiError;
  full_messages: TApiError;
}

export const SignUp:VFC = () => {
  const history = useHistory();
  const [apiErrors, setErrorMessage] = useState<IApiErrors | undefined>(undefined);
  const [state, dispatch] = useReducer(submitReducer, initialState);
  const { handleSubmit, errors, control } = useForm<IFormValues>();

  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING});
    postRegistration({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
    })
    .then(() => {
      dispatch({ type: submitActionTypes.POST_SUCCESS });
      history.push("/login");
    })
    .catch(e => {
      if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        setErrorMessage(e.response.data.errors);
      } else {
        throw e;
      }
    });
  };

  return(
    <SignUpWrapper>
      <FormTitle>Sign Up</FormTitle>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormArea
          formInfo={signUpFormInfo(errors, control, apiErrors)}
        />
        <FormSubmit
          isDisabled={isDisabled(state.postState)}
          onSubmitLabel={onSubmitLabel(state.postState, "SignUp!")}
        />
      </FormWrapper>
      <FormLinks
        linkInfo={signUpLinkInfo}
      />
    </SignUpWrapper>
  );
}