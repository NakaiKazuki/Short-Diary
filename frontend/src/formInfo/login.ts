import { FieldErrors, FieldError } from "react-hook-form";
interface IRurles {
  required: boolean;
  minLength?: number;
  maxLength: number;
}

interface IObject {
  formLabel: string;
  errorsProperty: FieldError | undefined;
  errorMessage: string;
  apiErrorProperty: Array<string> | undefined;
  apiMessagePropertyName: string;
  nameAttribute: "email" | "password";
  typeAttribute: string;
  defaultValue: string;
  autoComplete: string;
  autoFocus: boolean;
  rules: IRurles;
}

interface IFormInfo {
  email: IObject;
  password: IObject;
}

interface IErrors {
  email: string;
  password: string;
}

// Loginページのフォーム欄を表示するために必要な情報群
export const loginFormInfo = (
  errors: FieldErrors<IErrors>,
  apiErrors: Array<string> | undefined
): IFormInfo => {
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
type TLoginInfo = [
  {
    url: string;
    text: string;
  }
];

export const loginLinkInfo: TLoginInfo = [
  {
    url: "/signup",
    text: "アカウントが無い方はこちら",
  },
];
