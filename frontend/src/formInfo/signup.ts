// 共通で利用
interface IRurles {
  required: boolean;
  minLength?: number;
  maxLength: number;
}
type TApiError = Array<string>;
interface IObject {
  formLabel: string;
  errorsProperty: string;
  errorMessage: string;
  apiErrorProperty: TApiError | undefined;
  apiMessagePropertyName: string;
  nameAttribute: string;
  typeAttribute: string;
  control: any;
  defaultValue: string;
  autoComplete: string;
  autoFocus: boolean;
  rules: IRurles;
}

interface IErrors {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
interface ISignUpApiErrors {
  name?: TApiError;
  email?: TApiError;
  password?: TApiError;
  password_confirmation?: TApiError;
}

type IReturnSignUp = {
  name: IObject;
  email :IObject;
  password: IObject;
  password_confirmation: IObject};

  // SignUpページのフォーム欄を表示するために必要な情報群
export const signUpFormInfo = (errors: IErrors, control: object, apiErrors: ISignUpApiErrors | undefined): IReturnSignUp => {
  return {
    name: {
      formLabel: 'Name:',
      errorsProperty: errors.name,
      errorMessage: '1文字以上、50文字以内で入力してください',
      apiErrorProperty: apiErrors?.name,
      apiMessagePropertyName: '名前',
      nameAttribute: 'name',
      typeAttribute: 'text',
      control: control,
      defaultValue: '',
      autoComplete: 'username',
      autoFocus: true,
      rules: { required: true, maxLength: 50 },
    },
    email: {
      formLabel: 'Email:',
      errorsProperty: errors.email,
      errorMessage: '1文字以上、255文字以内で入力してください',
      apiErrorProperty: apiErrors?.email,
      apiMessagePropertyName:'メールアドレス',
      nameAttribute: 'email',
      typeAttribute: 'email',
      control: control,
      defaultValue: '',
      autoComplete: 'email',
      autoFocus: false,
      rules:{ required: true , maxLength: 255},
    },
    password: {
      formLabel: 'パスワード: ',
      errorsProperty: errors.password,
      errorMessage: '正しいパスワードを入力してください',
      apiErrorProperty:  apiErrors?.password,
      apiMessagePropertyName: 'パスワード',
      nameAttribute: 'password',
      typeAttribute: 'password',
      control: control,
      defaultValue: '',
      autoComplete: 'new-password',
      autoFocus: false,
      rules: { required: true,minLength: 6, maxLength: 128},
    },
    password_confirmation: {
      formLabel: '確認用パスワード:',
      errorsProperty: errors.password_confirmation,
      errorMessage: 'パスワードと同じ内容を入力してください',
      apiErrorProperty:  apiErrors?.password_confirmation,
      apiMessagePropertyName: '確認用パスワード',
      nameAttribute: 'password_confirmation',
      typeAttribute: 'password',
      control: control,
      defaultValue: '',
      autoComplete: 'new-password',
      autoFocus: false,
      rules: {required: true, minLength: 6, maxLength: 128},
    }
  };
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
