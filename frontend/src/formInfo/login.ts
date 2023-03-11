import { FieldErrors } from "react-hook-form";

// types
import { TLinks, IForm, IErrors } from "../types/formInfo";

// Loginページのフォーム欄を表示するために必要な情報群
export const loginFormInfo = (
  errors: FieldErrors<Pick<IErrors, "email" | "password">>,
  apiErrors: Array<string> | undefined
): Pick<IForm, "email" | "password"> => {
  return {
    email: {
      formLabel: "Email:",
      errorsProperty: errors.email,
      errorMessage: "登録したメールアドレスを入力してください",
      apiErrorProperty: apiErrors,
      apiMessagePropertyName: "",
      nameAttribute: "email",
      typeAttribute: "email",
      defaultValue: "",
      autoComplete: "email",
      autoFocus: true,
      rules: { required: true, maxLength: 255 },
    },
    password: {
      formLabel: "パスワード: ",
      errorsProperty: errors.password,
      errorMessage: "正しいパスワードを入力してください",
      apiErrorProperty: apiErrors,
      apiMessagePropertyName: "",
      nameAttribute: "password",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "current-password",
      autoFocus: false,
      rules: { required: true, minLength: 6, maxLength: 128 },
    },
  };
};

// 送信ボタン下にあるリンクの情報

export const loginLinkInfo: TLinks = [
  {
    url: "/signup",
    text: "アカウントが無い方はこちら",
  },
];
