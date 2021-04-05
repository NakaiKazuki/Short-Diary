// 共通で利用
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
      formLabel: "Name:",
      errorsProperty: errors.name,
      errorMessage: "1文字以上、50文字以内で入力してください",
      apiErrorProperty: apiErrors?.name,
      apiMessagePropertyName: "名前",
      nameAttribute: "name",
      typeAttribute: "text",
      control: control,
      defaultValue: "",
      autoFocus: true,
      rules: { required: true, maxLength: 50 },
    },
    {
      formLabel: "Email:",
      errorsProperty: errors.email,
      errorMessage: "1文字以上、255文字以内で入力してください",
      apiErrorProperty: apiErrors?.email,
      apiMessagePropertyName:"メールアドレス",
      nameAttribute: "email",
      typeAttribute: "email",
      control: control,
      defaultValue: "",
      autoFocus: false,
      rules:{ required: true , maxLength: 255},
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
      rules: { required: true,minLength: 6, maxLength: 128},
    },
    {
      formLabel: "確認用パスワード:",
      errorsProperty: errors.password_confirmation,
      errorMessage: "パスワードと同じ内容を入力してください",
      apiErrorProperty:  apiErrors?.password_confirmation,
      apiMessagePropertyName: "確認用パスワード",
      nameAttribute: "password_confirmation",
      typeAttribute: "password",
      control: control,
      defaultValue: "",
      autoFocus: false,
      rules: {required: true, minLength: 6, maxLength: 128},
    }
  ];
};


// 送信ボタン下にあるリンクの情報
type TSignUpLinkInfo = [
  {
    url: string;
    text: string;
  }
 ];

export  const signUpLinkInfo: TSignUpLinkInfo  = [
  {
    url: '/login',
    text: 'アカウントをお持ちの方はこちら',
  }
];
