import { FC, useState, useReducer, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//contexts
import { MessageContext } from "../contexts/Message";

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

// css
const SignUpWrapper = styled.div`
  width: 100vw;
  min-height: 81vh;
  margin-top: 6.6vh;
  padding-top: 5.4vh;
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
  const { setMessage } = useContext(MessageContext);
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
      formLabel: "Name:",
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
      formLabel: "Email:",
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
      formLabel: "パスワード: ",
      errorsProperty: errors.password,
      errorMessage: "正しいパスワードを入力してください",
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
      formLabel: "確認用パスワード:",
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
      text: "アカウントをお持ちの方はこちら",
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
          "認証用メールを送信しました。登録時のメールアドレスから認証を済ませてください。"
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
    <SignUpWrapper>
      <FormTitle>Sign Up</FormTitle>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="signUpForm">
        <FormItem formInfo={formInfo.name} control={control} />

        <FormItem formInfo={formInfo.email} control={control} />

        <FormItem formInfo={formInfo.password} control={control} />

        <FormItem formInfo={formInfo.password_confirmation} control={control} />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "SignUp!")}
        />
      </FormWrapper>
      <FormLinks linkInfo={linkInfo} />
    </SignUpWrapper>
  );
};
