import { FC, useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
// atoms
import { authAtom, messageAtom } from "../atoms";

// types
import { TLinks } from "../types/containers";

// components
import {
  FormLinks,
  FormSubmit,
  FormTitle,
  Form,
  Email,
} from "../components/users/forms";
// apis
import { postResetPassword } from "../apis/users/passwords";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// helpers
import { onSubmitText, isDisabled, removeUserCookies } from "../helpers";

// types
import {
  IUsersFormValues as IFormValues,
  IUsersResultErrors as IResultErrors,
} from "../types/containers";

// css
const Container = styled.div`
  min-height: 93.5vh;
  padding-top: 17vh;
  width: 100%;
`;

// エラーメッセージ
export const ResetPassword: FC = () => {
  const setCurrentUser = useSetRecoilState(authAtom);
  const setMessage = useSetRecoilState(messageAtom);
  const navigate = useNavigate();
  const [resultErrors, setErrorMessage] = useState<
    Pick<IResultErrors, "email"> | undefined
  >(undefined);
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
      url: "/login",
      text: "ログイン可能な方はこちら",
    },
  ];

  const onSubmit = async (formValues: IFormValues): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });
    await postResetPassword({
      email: formValues.email,
    })
      .then(() => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        setMessage("パスワードリセットメールを送信しました。");
        navigate("/", { replace: true });
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (e.response?.status === HTTP_STATUS_CODE.NOTFOUND) {
          removeUserCookies();
          setCurrentUser(undefined);
          setErrorMessage({ email: e.response.data.errors });
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return (
    <Container>
      <FormTitle>PasswordReset</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)} data-testid="resetPasswordForm">
        <Email
          control={control}
          autoFocus={true}
          defaultValue=""
          resultErrors={resultErrors?.email}
          errors={errors.email}
          required={true}
        />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "Password Reset!")}
        />
      </Form>
      <FormLinks linkInfo={linkInfo} />
    </Container>
  );
};
