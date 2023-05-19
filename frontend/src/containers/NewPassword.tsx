import { FC, useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

// atoms
import { messageAtom } from "../atoms";

// components
import {
  FormSubmit,
  FormTitle,
  Form,
  Password,
  PasswordConfirmation,
} from "../components/users/forms";

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
  min-height: 93.5vh;
  padding-top: 17vh;
  width: 100%;
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
      <Form onSubmit={handleSubmit(onSubmit)} data-testid="newPasswordForm">
        <Password
          control={control}
          autoFocus={true}
          resultErrors={resultErrors?.password}
          errors={errors.password}
          required={true}
        />

        <PasswordConfirmation
          control={control}
          autoFocus={false}
          resultErrors={resultErrors?.password_confirmation}
          errors={errors.password_confirmation}
          required={true}
        />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "Password Reset!")}
        />
      </Form>
    </Container>
  );
};
