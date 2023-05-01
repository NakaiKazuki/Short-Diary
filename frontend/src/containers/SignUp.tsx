import { FC, useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

// recoils
import { messageAtom } from "../recoils/Message";

// components
import {
  FormItem,
  FormSubmit,
  FormLinks,
  FormTitle,
  FormWrapper,
} from "../components/users";
// apis
import { postRegistration } from "../apis/users/registrations";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// helpers
import { onSubmitText, isDisabled } from "../helpers";

// types
import {
  IUsersFormValues as IFormValues,
  IUsersResultErrors as IResultErrors,
} from "../types/containers";

import { TLinks, IForm } from "../types/containers";

const Container = styled.div`
  width: 100%;
  min-height: 93.5vh;
  padding-top: 17vh;
`;

export const SignUp: FC = () => {
  const navigate = useNavigate();
  const [resultErrors, setErrorMessage] = useState<
    | Pick<
        IResultErrors,
        "name" | "email" | "password" | "password_confirmation"
      >
    | undefined
  >(undefined);
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const setMessage = useSetRecoilState(messageAtom);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();

  // SignUpページのフォーム欄を表示するために必要な情報群
  const formInfo: Pick<
    IForm,
    "name" | "email" | "password" | "password_confirmation"
  > = {
    name: {
      formLabel: "Name(必須):",
      errorsProperty: errors.name,
      errorMessage: "1文字以上、50文字以内で入力してください",
      resultErrorProperty: resultErrors?.name,
      apiMessagePropertyName: "名前",
      nameAttribute: "name",
      typeAttribute: "text",
      defaultValue: "",
      autoComplete: "username",
      autoFocus: true,
      rules: { required: true, maxLength: 50 },
    },
    email: {
      formLabel: "Email(必須):",
      errorsProperty: errors.email,
      errorMessage: "1文字以上、255文字以内で入力してください",
      resultErrorProperty: resultErrors?.email,
      apiMessagePropertyName: "メールアドレス",
      nameAttribute: "email",
      typeAttribute: "email",
      defaultValue: "",
      autoComplete: "email",
      autoFocus: false,
      rules: { required: true, maxLength: 255 },
    },
    password: {
      formLabel: "パスワード(必須): ",
      errorsProperty: errors.password,
      errorMessage: "6文字以上128文字以内で入力してください",
      resultErrorProperty: resultErrors?.password,
      apiMessagePropertyName: "パスワード",
      nameAttribute: "password",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "new-password",
      autoFocus: false,
      rules: { required: true, minLength: 6, maxLength: 128 },
    },
    password_confirmation: {
      formLabel: "確認用パスワード(必須):",
      errorsProperty: errors.password_confirmation,
      errorMessage: "パスワードと同じ内容を入力してください",
      resultErrorProperty: resultErrors?.password_confirmation,
      apiMessagePropertyName: "確認用パスワード",
      nameAttribute: "password_confirmation",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "new-password",
      autoFocus: false,
      rules: { required: true, minLength: 6, maxLength: 128 },
    },
  };

  const linkInfo: TLinks = [
    {
      url: "/login",
      text: "登録済みの方はこちら",
    },
  ];

  const onSubmit = async (formValues: IFormValues): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });
    await postRegistration({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
    })
      .then(() => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        setMessage(
          "認証用メールを送信しました。登録されたメールアドレスから認証を済ませてください。"
        );
        navigate("/", { replace: true });
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (
          e.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
          e.response?.status === HTTP_STATUS_CODE.UNPROCESSABLE
        ) {
          setErrorMessage(e.response.data.errors);
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return (
    <Container>
      <FormTitle>Sign Up</FormTitle>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="signUpForm">
        <FormItem formInfo={formInfo.name} control={control} />

        <FormItem formInfo={formInfo.email} control={control} />

        <FormItem formInfo={formInfo.password} control={control} />

        <FormItem formInfo={formInfo.password_confirmation} control={control} />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "Sign Up!")}
        />
      </FormWrapper>
      <FormLinks linkInfo={linkInfo} />
    </Container>
  );
};
