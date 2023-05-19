import { FC, useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
// atoms
import { authAtom } from "../atoms";

// types
import { TLinks } from "../types/containers";

// components
import {
  FormTitle,
  Form,
  Email,
  Password,
  FormSubmit,
  FormLinks,
} from "../components/users/forms";
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
      <Form onSubmit={handleSubmit(onSubmit)} data-testid="loginForm">
        <Email
          control={control}
          autoFocus={true}
          defaultValue=""
          resultErrors={resultErrors}
          errors={errors.email}
          required={true}
        />
        <Password
          control={control}
          autoFocus={false}
          resultErrors={resultErrors}
          errors={errors.password}
          required={true}
        />
        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "Login!")}
        />
      </Form>
      <FormLinks linkInfo={linkInfo} />
    </Container>
  );
};
