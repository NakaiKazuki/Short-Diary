import { FC, useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
// recoils
import { authAtom } from "../recoils/Auth";
import { messageAtom } from "../recoils/Message";

// types
import { TLinks, IForm } from "../types/containers";

// components
import {
  FormItem,
  FormSubmit,
  FormLinks,
  FormTitle,
  FormWrapper,
} from "../components/users";

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
const ResetPasswordWrapper = styled.div`
  width: 100%;
  min-height: 50vh;
  padding-top: 17vh;
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

  const formInfo: Pick<IForm, "email"> = {
    email: {
      formLabel: "Email:",
      errorsProperty: errors.email,
      errorMessage: "登録したメールアドレスを入力してください",
      resultErrorProperty: resultErrors?.email,
      apiMessagePropertyName: "",
      nameAttribute: "email",
      typeAttribute: "email",
      defaultValue: "",
      autoComplete: "email",
      autoFocus: true,
      rules: { required: true, maxLength: 255 },
    },
  };

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
    <ResetPasswordWrapper>
      <FormTitle>PasswordReset</FormTitle>
      <FormWrapper
        onSubmit={handleSubmit(onSubmit)}
        data-testid="resetPasswordForm"
      >
        <FormItem formInfo={formInfo.email} control={control} />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "Password Reset!")}
        />
      </FormWrapper>
      <FormLinks linkInfo={linkInfo} />
    </ResetPasswordWrapper>
  );
};