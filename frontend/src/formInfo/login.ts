interface IRurles {
  required: boolean;
  minLength?: number;
  maxLength: number;
}

interface IObject {
  formLabel: string;
  errorsProperty: string;
  errorMessage: string;
  apiErrorProperty: Array<string> | undefined;
  apiMessagePropertyName: string;
  nameAttribute: string;
  typeAttribute: string;
  control: any;
  defaultValue: string;
  autoFocus: boolean;
  rules: IRurles;
}

// Loginページのフォーム欄を表示するために必要な情報群
interface ILoginApiErrors {
  email?: Array<string>;
  password?: Array<string>;
}

type TReturnLogin = [IObject, IObject];

export const LoginFormInfo = (errors: any, control: any, apiErrors: ILoginApiErrors | undefined): TReturnLogin => {
  return [
    {
      formLabel: "Email:",
      errorsProperty: errors.email,
      errorMessage: "登録したメールアドレスを入力してください",
      apiErrorProperty: apiErrors?.email,
      apiMessagePropertyName:"メールアドレス",
      nameAttribute: "email",
      typeAttribute: "email",
      control: control,
      defaultValue: "",
      autoFocus: true,
      rules:{ required: true , maxLength: 255}
    },
    {
      formLabel: "パスワード: ",
      errorsProperty: errors.password,
      errorMessage: "正しいパスワードを入力してください",
      apiErrorProperty:  apiErrors?.password,
      apiMessagePropertyName: "パスワード",
      nameAttribute: "password",
      typeAttribute: "password",
      control: control,
      defaultValue: "",
      autoFocus: false,
      rules: { required: true, minLength: 6, maxLength: 128}
    },
  ];
};


type TLoginInfo = [
  {
    url: string;
    text: string;
  }
 ];

export const LoginLinkInfo: TLoginInfo = [
  {
    url: '/signup',
    text: 'アカウントが無い方はこちら',
  }
];