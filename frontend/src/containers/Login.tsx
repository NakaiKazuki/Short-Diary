import { FC, useState, useReducer, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";
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
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
}
// エラーメッセージ
export const Login: FC = () => {
  const navigate = useNavigate();
  const [apiErrors, setErrorMessage] = useState<Array<string> | undefined>(
    undefined
  );
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const { setCurrentUser } = useContext(AuthContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();
  const formInfo = loginFormInfo(errors, apiErrors);
  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING });
    createSession({
      email: formValues.email,
      password: formValues.password,
    })
      .then((res) => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        Cookies.set("uid", res.headers["uid"]);
        Cookies.set("client", res.headers["client"]);
        Cookies.set("access-token", res.headers["access-token"]);
        setCurrentUser(res.data);
        navigate("/", { replace: true });
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (
          e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
          e.response.status === HTTP_STATUS_CODE.UNPROCESSABLE
        ) {
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          setCurrentUser(undefined);
          setErrorMessage(e.response.data.errors);
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return (
    <LoginWrapper>
      <FormTitle>Login</FormTitle>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="loginForm">
        <FormItem formInfo={formInfo.email} control={control} />

        <FormItem formInfo={formInfo.password} control={control} />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "Login!")}
        />
      </FormWrapper>
      <FormLinks linkInfo={loginLinkInfo} />
    </LoginWrapper>
  );
};
