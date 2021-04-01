import React, { VFC, useState , useReducer, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {useHistory} from "react-router-dom";
import styled from 'styled-components';

//contexts
import { CurrentUserContext } from '../contexts/CurrentUser';

// components
import { SharedForm } from '../components/Forms/SharedForm';

// apis
import { createSession } from '../apis/users/sessions';

// responses
import { HTTP_STATUS_CODE } from '../constants';

// forminfo
import { LoginFormInfo } from '../formInfo';

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
    <LoginWrapper>
      <SharedForm
        formTitle={"Login"}
        formInfo={LoginFormInfo(errors, control, apiErrors)}
        ClickSubmit={() => handleSubmit(onSubmit)}
        isDisabled={() => isDisabled(state.postState)}
        onSubmitLabel={() => onSubmitLabel(state.postState, "Login!")}
      />
    </LoginWrapper>
  );
}