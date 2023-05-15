import { FC, useState, useReducer, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

// atoms
import { authAtom } from "../atoms/Auth";
import { messageAtom } from "../atoms/Message";

// components
import {
  FormItem,
  FormLinks,
  FormSubmit,
  FormTitle,
  FormWrapper,
} from "../components/users";

import { ColorRed } from "../components/shared_style";
// apis
import { putRegistration } from "../apis/users/registrations";

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
import {
  IUserEditForm as IForm,
  IUsersFormValues as IFormValues,
  IUsersResultErrors as IResultErrors,
  TLinks,
} from "../types/containers";

// css
const Container = styled.div`
  min-height: 93.5vh;
  padding-top: 17vh;
  width: 100%;
`;

const GuestMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0.6rem auto auto auto;
  text-align: center;
`;

export const UserEdit: FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(authAtom);

  const [resultErrors, setErrorMessage] = useState<IResultErrors | undefined>(
    undefined
  );
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const setMessage = useSetRecoilState(messageAtom);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();

  if (!currentUser) {
    navigate("../login", { replace: true });
    return null;
  }
  // UserEditページのフォーム欄を表示するために必要な情報群
  const formInfo: IForm = {
    name: {
      formLabel: "Name:",
      errorsProperty: errors.name,
      errorMessage: "1文字以上、50文字以内で入力してください",
      resultErrorProperty: resultErrors?.name,
      apiMessagePropertyName: "名前",
      nameAttribute: "name",
      typeAttribute: "text",
      defaultValue: currentUser.name,
      autoComplete: "username",
      autoFocus: true,
      rules: { maxLength: 50 },
    },
    email: {
      formLabel: (
        <Fragment>
          <ColorRed>*</ColorRed>Email
        </Fragment>
      ),
      errorsProperty: errors.email,
      errorMessage: "255文字以内でメールアドレスを入力してください",
      resultErrorProperty: resultErrors?.email,
      apiMessagePropertyName: "メールアドレス",
      nameAttribute: "email",
      typeAttribute: "email",
      defaultValue: currentUser.email,
      autoComplete: "email",
      autoFocus: false,
      rules: {
        required: true,
        maxLength: 255,
        pattern:
          /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
      },
    },
    password: {
      formLabel: "新規パスワード(6文字以上):",
      errorsProperty: errors.password,
      errorMessage: "新しいパスワードを入力してください",
      resultErrorProperty: resultErrors?.password,
      apiMessagePropertyName: "パスワード",
      nameAttribute: "password",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "new-password",
      autoFocus: false,
      rules: { minLength: 6, maxLength: 128, pattern: /^[^\s\t]+$/ },
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
      rules: { minLength: 6, maxLength: 128 },
    },
    current_password: {
      formLabel: (
        <Fragment>
          <ColorRed>*</ColorRed>現在使用中のパスワード
        </Fragment>
      ),
      errorsProperty: errors.current_password,
      errorMessage: "現在使用中のパスワードを入力してください",
      resultErrorProperty: resultErrors?.current_password,
      apiMessagePropertyName: "使用中のパスワード",
      nameAttribute: "current_password",
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
      url: "/",
      text: "Home",
    },
  ];

  const onSubmit = async (formValues: IFormValues): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });
    await putRegistration({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
      current_password: formValues.current_password,
    })
      .then((res) => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        setUserCookies(res);
        setCurrentUser(res.data.data);
        setMessage("登録情報の編集に成功しました。");
        navigate("../", { replace: true });
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (e.response?.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
          setErrorMessage(e.response.data.errors);
        } else if (
          e.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
          e.response?.status === HTTP_STATUS_CODE.FORBIDDEN
        ) {
          setCurrentUser(undefined);
          removeUserCookies();
          navigate("/login", { replace: true });
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return (
    <Container>
      <FormTitle>Profile Edit</FormTitle>

      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="userEditForm">
        {resultErrors?.guest?.map((message: string, index: number) => (
          <GuestMessage
            key={`guestError-${index}`}
            data-testid="guestResultError"
          >
            {message}
          </GuestMessage>
        ))}
        <FormItem formInfo={formInfo.name} control={control} />

        <FormItem formInfo={formInfo.email} control={control} />

        <FormItem formInfo={formInfo.password} control={control} />

        <FormItem formInfo={formInfo.password_confirmation} control={control} />

        <FormItem formInfo={formInfo.current_password} control={control} />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "編集する")}
        />
      </FormWrapper>
      <FormLinks linkInfo={linkInfo} />
    </Container>
  );
};
