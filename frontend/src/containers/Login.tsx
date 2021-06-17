import { VFC, useState, useReducer, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

//contexts
import { AuthContext } from "../contexts/Auth";

// components
import {
  FormItem,
  FormSubmit,
  FormLinks,
  FormTitle,
  FormWrapper,
} from "../components/users";

// apis
import { createSession } from "../apis/users/sessions";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// forminfo
import { loginFormInfo, loginLinkInfo } from "../formInfo";

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// helpers
import { onSubmitText, isDisabled } from "../helpers";

// css
const LoginWrapper = styled.div`
  width: 100vw;
  min-height: 81vh;
  margin-top: 6.6vh;
  padding-top: 5.4vh;
`;

// 型
// Formから送信される情報
interface IFormValues {
  email: string;
  password: string;
}

// エラーメッセージ
type TApiError = Array<string>;

interface IApiErrors {
  email?: TApiError;
  password?: TApiError;
}

export const Login: VFC = () => {
  const history = useHistory();
  const [apiErrors, setErrorMessage] =
    useState<IApiErrors | undefined>(undefined);
  const [state, dispatch] = useReducer(submitReducer, initialState);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { handleSubmit, control, errors } = useForm<IFormValues>();
  const formInfo = loginFormInfo(errors, control, apiErrors);
  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING });
    createSession({
      email: formValues.email,
      password: formValues.password,
    })
      .then((res) => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        setCurrentUser({
          ...currentUser,
          ...res.data,
          headers: res.headers,
        });
        history.push("/");
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          setErrorMessage(e.response.data.errors);
        } else {
          throw e;
        }
      });
  };

  return (
    <LoginWrapper>
      <FormTitle>Login</FormTitle>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="loginForm">
        <FormItem formInfo={formInfo.email} />

        <FormItem formInfo={formInfo.password} />

        <FormSubmit
          isDisabled={isDisabled(state.postState)}
          onSubmitText={onSubmitText(state.postState, "Login!")}
        />
      </FormWrapper>
      <FormLinks linkInfo={loginLinkInfo} />
    </LoginWrapper>
  );
};
