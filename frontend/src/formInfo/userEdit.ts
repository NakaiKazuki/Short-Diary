import { FieldErrors } from "react-hook-form";

// types
import {
  TLinks,
  IErrors,
  IApiErrors,
  IUserEditForm as IForm,
} from "../types/formInfo";

// UserEditページのフォーム欄を表示するために必要な情報群
export const UserEditFormInfo = (
  errors: FieldErrors<IErrors>,
  apiErrors: IApiErrors | undefined,
  currentUser: ICurrentUser
): IForm => {
  return {
    name: {
      formLabel: "Name:",
      errorsProperty: errors.name,
      errorMessage: "1文字以上、50文字以内で入力してください",
      apiErrorProperty: apiErrors?.name,
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
      apiErrorProperty: apiErrors?.email,
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
      apiErrorProperty: apiErrors?.password,
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
      apiErrorProperty: apiErrors?.password_confirmation,
      apiMessagePropertyName: "確認用パスワード",
      nameAttribute: "password_confirmation",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "new-password",
      autoFocus: false,
      rules: { minLength: 6, maxLength: 128 },
    },
    current_password: {
      formLabel: "現在使用中のパスワード:",
      errorsProperty: errors.current_password,
      errorMessage: "現在使用中のパスワードを入力してください",
      apiErrorProperty: apiErrors?.current_password,
      apiMessagePropertyName: "使用中のパスワード",
      nameAttribute: "current_password",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "current-password",
      autoFocus: false,
      rules: { required: true, minLength: 6, maxLength: 128 },
    },
  };
};

// 送信ボタン下にあるリンクの情報
export const UserEditLinkInfo: TLinks = [
  {
    url: "/",
    text: "Home",
  },
];
