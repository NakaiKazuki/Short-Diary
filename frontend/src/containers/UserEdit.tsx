import { FC, useState, useReducer, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";

//contexts
import { AuthContext } from "../contexts/Auth";
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
import { onSubmitText, isDisabled } from "../helpers";

// types
import {
  IUsersFormValues as IFormValues,
  IUsersResultErrors as IResultErrors,
  IUserEditForm as IForm,
  TLinks,
} from "../types/containers";
// css
const UserEditWrapper = styled.div`
  width: 100%;
  min-height: 50vh;
  margin-top: 21vh;
`;

const GuestErrorMessage = styled.p`
  text-align: center;
  margin: 0.6rem auto auto auto;
  color: red;
  font-size: 0.9rem;
`;

export const UserEdit: FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [resultErrors, setErrorMessage] = useState<IResultErrors | undefined>(
    undefined
  );
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const { setMessage } = useContext(MessageContext);
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
      formLabel: "Email:",
      errorsProperty: errors.email,
      errorMessage: "1文字以上、255文字以内で入力してください",
      resultErrorProperty: resultErrors?.email,
      apiMessagePropertyName: "メールアドレス",
      nameAttribute: "email",
      typeAttribute: "email",
      defaultValue: currentUser.email,
      autoComplete: "email",
      autoFocus: false,
      rules: { maxLength: 255 },
    },
    password: {
      formLabel: "新規パスワード: ",
      errorsProperty: errors.password,
      errorMessage: "新しいパスワードを入力してください",
      resultErrorProperty: resultErrors?.password,
      apiMessagePropertyName: "パスワード",
      nameAttribute: "password",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "new-password",
      autoFocus: false,
      rules: { minLength: 6, maxLength: 128 },
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
      formLabel: "現在使用中のパスワード(必須):",
      errorsProperty: errors.current_password,
      errorMessage: "現在使用中のパスワードを入力してください",
      resultErrorProperty: resultErrors?.current_password,
      apiMessagePropertyName: "使用中のパスワード",
      nameAttribute: "current_password",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "current-password",
      autoFocus: false,
      rules: { required: true, minLength: 6, maxLength: 128 },
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
        Cookies.set("uid", res.headers["uid"]);
        Cookies.set("client", res.headers["client"]);
        Cookies.set("access-token", res.headers["access-token"]);
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
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          navigate("/login", { replace: true });
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return (
    <UserEditWrapper>
      <FormTitle>Profile Edit</FormTitle>

      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="userEditForm">
        {resultErrors?.guest?.map((message: string, index: number) => (
          <GuestErrorMessage
            key={`guestError-${index}`}
            data-testid="guestResultError"
          >
            {message}
          </GuestErrorMessage>
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
    </UserEditWrapper>
  );
};
