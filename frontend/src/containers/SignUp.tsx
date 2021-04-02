import React, { VFC, useState, useReducer,useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

// contexts
import { CurrentUserContext } from '../contexts/CurrentUser'

// components
import {
  SharedFormArea,
  SharedFormSubmit,
  FormLinkListWrapper,
  FormLinkList,
  FormLinkItem,
  FormLink } from '../components/Forms';

// apis
import { postRegistration } from '../apis/users/registrations';

// responses
import { HTTP_STATUS_CODE } from '../constants';

// formitemsinfo
import { SignUpFormInfo } from '../formInfo';

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

import {
  FormTitleWrapper,
  FormWrapper,
} from '../components/Forms/style';

// css
const SignUpWrapper = styled.div`
  margin-top: 12vh;
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
interface IApiErrors {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  full_messages: Array<string>;
}

export const SignUp:VFC = () => {
  const history = useHistory();
  const [apiErrors, setErrorMessage] = useState<IApiErrors | undefined>(undefined);
  const [state, dispatch] = useReducer(submitReducer, initialState);
  const { handleSubmit, errors, control } = useForm<IFormValues>();
  const {currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING});
    postRegistration({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
    })
    .then(data => {
      dispatch({ type: submitActionTypes.POST_SUCCESS });
      setCurrentUser({
        ...currentUser,
        currentUser: data,
      });
      history.push("/");
    })
    .catch(e => {
      if (e.response.status === HTTP_STATUS_CODE.VALIDATION_FAILED) {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        setErrorMessage(e.response.data.errors);
      } else {
        throw e;
      }
    });
  };

  return(
    <SignUpWrapper>
      <FormTitleWrapper>Sign Up</FormTitleWrapper>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <SharedFormArea
          formInfo={SignUpFormInfo(errors, control, apiErrors)}
        />
        <SharedFormSubmit
          isDisabled={() => isDisabled(state.postState)}
          onSubmitLabel={() => onSubmitLabel(state.postState, "SignUp!")}
        />
      </FormWrapper>
      <FormLinkListWrapper>
        <FormLinkList>
          <FormLinkItem>
            <FormLink to={'/login'} >アカウントをお持ちの方はこちら</FormLink>
          </FormLinkItem>
        </FormLinkList>
      </FormLinkListWrapper>
    </SignUpWrapper>
  );
}