import { FC, useState, useReducer, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

// atoms
import { messageAtom } from "../atoms/Message";

// types
import { IForm } from "../types/containers";

// components
import {
  FormItem,
  FormSubmit,
  FormTitle,
  FormWrapper,
} from "../components/users";
import { ColorRed } from "../components/shared_style";

// apis
import { putNewPassword } from "../apis/users/passwords";

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

// css
const Container = styled.div`
  width: 100%;
  min-height: 93.5vh;
  padding-top: 17vh;
`;

// エラーメッセージ
export const NewPassword: FC = () => {
  const setMessage = useSetRecoilState(messageAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const [resultErrors, setErrorMessage] = useState<
    Pick<IResultErrors, "password" | "password_confirmation"> | undefined
  >(undefined);
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();

  const formInfo: Pick<IForm, "password" | "password_confirmation"> = {
    password: {
      formLabel: (
        <Fragment>
          <ColorRed>*</ColorRed>パスワード
        </Fragment>
      ),
      errorsProperty: errors.password,
      errorMessage: "6文字以上128文字以内で入力してください",
      resultErrorProperty: resultErrors?.password,
      apiMessagePropertyName: "パスワード",
      nameAttribute: "password",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "new-password",
      autoFocus: false,
      rules: { required: true, minLength: 6, maxLength: 128, pattern: /^[^\s\t]+$/ },
    },
    password_confirmation: {
      formLabel: (
        <Fragment>
          <ColorRed>*</ColorRed>確認用パスワード
        </Fragment>
      ),
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

  const params = new URLSearchParams(location.search);
  const resetPasswordToken = params.get("token");
  const headers: IHeaders = {
    "access-token": params.get("access-token") ?? "",
    client: params.get("client") ?? "",
    uid: params.get("uid") ?? "",
  };
  const onSubmit = async (formValues: IFormValues): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });

    if (!resetPasswordToken) {
      setMessage("再設定用メールを使用しこちらのページを開いてください");
      return navigate("/", { replace: true });
    }
    await putNewPassword(
      {
        password: formValues.password,
        password_confirmation: formValues.password_confirmation,
        reset_password_token: resetPasswordToken,
      },
      headers
    )
      .then(() => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        setMessage("パスワードの再設定に成功しました。");
        navigate("/login", { replace: true });
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
      <FormTitle>PasswordReset</FormTitle>
      <FormWrapper
        onSubmit={handleSubmit(onSubmit)}
        data-testid="newPasswordForm"
      >
        <FormItem formInfo={formInfo.password} control={control} />
        <FormItem formInfo={formInfo.password_confirmation} control={control} />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "Password Reset!")}
        />
      </FormWrapper>
    </Container>
  );
};
