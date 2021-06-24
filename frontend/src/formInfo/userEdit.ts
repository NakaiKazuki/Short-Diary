interface IRurles {
  required?: boolean;
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
  autoComplete: string;
  autoFocus: boolean;
  rules: IRurles;
}

interface IUserEditApiErrors {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  current_password?: Array<string>;
}
interface ICurrentUser {
  name: string;
  email: string;
}

interface IFormInfo {
  name: IObject;
  email: IObject;
  password: IObject;
  password_confirmation: IObject;
  current_password: IObject;
}

// UserEditページのフォーム欄を表示するために必要な情報群
export const UserEditFormInfo = (
  errors: any,
  control: object,
  apiErrors: IUserEditApiErrors | undefined,
  currentUser: ICurrentUser
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
      control: control,
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
      control: control,
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
      control: control,
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
      control: control,
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
      control: control,
      defaultValue: "",
      autoComplete: "current-password",
      autoFocus: false,
      rules: { required: true, minLength: 6, maxLength: 128 },
    },
  };
};

// 送信ボタン下にあるリンクの情報
type TUserEditInfo = [
  {
    url: string;
    text: string;
  }
];

export const UserEditLinkInfo: TUserEditInfo = [
  {
    url: "/",
    text: "Home",
  },
];
