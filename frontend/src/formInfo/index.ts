// 共通で利用
interface IRurles {
  required: boolean;
  maxLength: number;
  minLength?: number;
}

export interface IObject {
  errorsProperty: string;
  control: any;
  apiErrorProperty: Array<string> | undefined;
  formLabel: string;
  errorMessage: string;
  apiMessagePropertyName: string;
  nameAttribute: string;
  typeAttribute: string;
  rules: IRurles;
}

// SignUpページのフォーム欄を表示するために必要な情報群
interface ISignUpApiErrors {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
}

type TReturnSignUp = [IObject, IObject, IObject, IObject];

export const SignUpFormInfo = (errors: any, control: any, apiErrors: ISignUpApiErrors | undefined): TReturnSignUp => {
  return [
    {
      errorsProperty: errors.name,
      control: control,
      apiErrorProperty: apiErrors?.name,
      formLabel: "Name:",
      errorMessage: "1文字以上、50文字以内で入力してください",
      apiMessagePropertyName: "名前",
      nameAttribute: "name",
      typeAttribute: "text",
      rules: { required: true, maxLength: 50 },
    },
    {
      errorsProperty: errors.email,
      control: control,
      apiErrorProperty: apiErrors?.email,
      formLabel: "Email:",
      errorMessage: "1文字以上、255文字以内で入力してください",
      apiMessagePropertyName:"メールアドレス",
      nameAttribute: "email",
      typeAttribute: "email",
      rules:{ required: true , maxLength: 255},
    },
    {
      errorsProperty: errors.password,
      control: control,
      apiErrorProperty:  apiErrors?.password,
      formLabel: "パスワード: ",
      errorMessage: "正しいパスワードを入力してください",
      apiMessagePropertyName: "パスワード",
      nameAttribute: "password",
      typeAttribute: "password",
      rules: { required: true,minLength: 6, maxLength: 128},
    },
    {
      errorsProperty: errors.password_confirmation,
      control: control,
      apiErrorProperty:  apiErrors?.password_confirmation,
      formLabel: "確認用パスワード:",
      errorMessage: "パスワードと同じ内容を入力してください",
      apiMessagePropertyName: "確認用パスワード",
      nameAttribute: "password_confirmation",
      typeAttribute: "password",
      rules: {required: true, minLength: 6, maxLength: 128},
    }
  ]
};

// Loginページのフォーム欄を表示するために必要な情報群
interface ILoginApiErrors {
  email?: Array<string>;
  password?: Array<string>;
}

type TReturnLogin = [IObject, IObject];

export const LoginFormInfo = (errors: any, control: any, apiErrors: ILoginApiErrors | undefined): TReturnLogin => {
  return [
    {
      errorsProperty: errors.email,
      control: control,
      apiErrorProperty: apiErrors?.email,
      formLabel: "Email:",
      errorMessage: "登録したメールアドレスを入力してください",
      apiMessagePropertyName:"メールアドレス",
      nameAttribute: "email",
      typeAttribute: "email",
      rules:{ required: true , maxLength: 255}
    },
    {
      errorsProperty: errors.password,
      control: control,
      apiErrorProperty:  apiErrors?.password,
      formLabel: "パスワード: ",
      errorMessage: "正しいパスワードを入力してください",
      apiMessagePropertyName: "パスワード",
      nameAttribute: "password",
      typeAttribute: "password",
      rules: { required: true, minLength: 6, maxLength: 128}
    },
  ]
};