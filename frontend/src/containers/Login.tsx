import { FC, useState, useReducer, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
// atoms
import { authAtom } from "../atoms/Auth";

// types
import { TLinks, IForm } from "../types/containers";

// components
import {
  FormItem,
  FormLinks,
  FormSubmit,
  FormTitle,
  FormWrapper,
} from "../components/users";

// apis
import { createSession } from "../apis/users/sessions";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// helpers
import {
  isDisabled,
  onSubmitText,
  removeUserCookies,
  setUserCookies,
} from "../helpers";

// types
import { IUsersFormValues as IFormValues } from "../types/containers";

// css
import { ColorRed } from "../components/shared_style";

const Container = styled.div`
  min-height: 93.5vh;
  padding-top: 17vh;
  width: 100%;
`;

// エラーメッセージ
export const Login: FC = () => {
  const setCurrentUser = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  const [resultErrors, setErrorMessage] = useState<Array<string> | undefined>(
    undefined
  );
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();

  const formInfo: Pick<IForm, "email" | "password"> = {
    email: {
      formLabel: (
        <Fragment>
          <ColorRed>*</ColorRed>Email
        </Fragment>
      ),
      errorsProperty: errors.email,
      errorMessage: "登録したメールアドレスを入力してください",
      resultErrorProperty: resultErrors,
      apiMessagePropertyName: "",
      nameAttribute: "email",
      typeAttribute: "email",
      defaultValue: "",
      autoComplete: "email",
      autoFocus: true,
      rules: {
        required: true,
        maxLength: 255,
        pattern:
          /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
      },
    },
    password: {
      formLabel: (
        <Fragment>
          <ColorRed>*</ColorRed>パスワード
        </Fragment>
      ),
      errorsProperty: errors.password,
      errorMessage: "正しいパスワードを入力してください",
      resultErrorProperty: resultErrors,
      apiMessagePropertyName: "",
      nameAttribute: "password",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "current-password",
      autoFocus: false,
      rules: {
        required: true,
        minLength: 6,
        maxLength: 128,
        pattern: /^[^\s\t]+$/,
      },
    },
  };

  // 送信ボタン下にあるリンクの情報
  const linkInfo: TLinks = [
    {
      url: "/signup",
      text: "アカウントが無い方はこちら",
    },
    {
      url: "/resetPassword",
      text: "パスワードを忘れた方はこちら",
    },
  ];
  const onSubmit = async (formValues: IFormValues): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });
    await createSession({
      email: formValues.email,
      password: formValues.password,
    })
      .then((res) => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        setUserCookies(res);
        setCurrentUser(res.data.data);
        navigate("/", { replace: true });
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (
          e.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
          e.response?.status === HTTP_STATUS_CODE.UNPROCESSABLE
        ) {
          removeUserCookies();
          setCurrentUser(undefined);
          setErrorMessage(e.response.data.errors);
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return (
    <Container>
      <FormTitle>Login</FormTitle>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="loginForm">
        <FormItem formInfo={formInfo.email} control={control} />

        <FormItem formInfo={formInfo.password} control={control} />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "Login!")}
        />
      </FormWrapper>
      <FormLinks linkInfo={linkInfo} />
    </Container>
  );
};
