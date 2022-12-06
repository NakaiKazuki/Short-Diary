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
  nameAttribute: "name" | "email" | "password" | "password_confirmation";
  typeAttribute: string;
  defaultValue: string;
  autoComplete: string;
  autoFocus: boolean;
  rules: IRurles;
}
interface ISignUpApiErrors {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
}

interface IFormInfo {
  name: IObject;
  email: IObject;
  password: IObject;
  password_confirmation: IObject;
}

interface IErrors {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// 送信ボタン下にあるリンクの情報
type TSignUpLinkInfo = [
  {
    url: string;
    text: string;
  }
];

// SignUpページのフォーム欄を表示するために必要な情報群
export const signUpFormInfo = (
  errors: FieldErrors<IErrors>,
  apiErrors: ISignUpApiErrors | undefined
): IFormInfo => {
  return {
    name: {
      formLabel: "Name:",
      errorsProperty: errors.name,
      errorMessage: "1文字以上、50文字以内で入力してください",
      apiErrorProperty: apiErrors?.name,
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
      apiErrorProperty: apiErrors?.email,
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
      apiErrorProperty: apiErrors?.password,
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
      apiErrorProperty: apiErrors?.password_confirmation,
      apiMessagePropertyName: "確認用パスワード",
      nameAttribute: "password_confirmation",
      typeAttribute: "password",
      defaultValue: "",
      autoComplete: "new-password",
      autoFocus: false,
      rules: { required: true, minLength: 6, maxLength: 128 },
    },
  };
};

export const signUpLinkInfo: TSignUpLinkInfo = [
  {
    url: "/login",
    text: "アカウントをお持ちの方はこちら",
  },
];
