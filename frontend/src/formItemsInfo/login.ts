// Loginページのフォーム欄を表示するために必要な情報群
export const formItemsInfo = (errors: any, control: any, apiErrors: any): Array<object> => {
  return [
    {
      errorsProperty: errors.email,
      control: control,
      apiErrorProperty: apiErrors && apiErrors.email,
      formLabel: "Email:",
      errorMessage: "登録したメールアドレスを入力してください",
      apiMessagePropertyName:"メールアドレス",
      nameAttribute: "email",
      typeAttribute: "email",
      rules:{ required: true , maxLength: 255}
    },
    {
      errorsProperty:errors.password,
      control:control,
      apiErrorProperty: apiErrors && apiErrors.password,
      formLabel:"パスワード:",
      errorMessage:"正しいパスワードを入力してください",
      apiMessagePropertyName:"パスワード",
      nameAttribute:"password",
      typeAttribute:"password",
      rules:{ required: true,minLength: 6, maxLength: 128}
    },
  ]
};