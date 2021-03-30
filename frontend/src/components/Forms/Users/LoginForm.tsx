import React, { VFC, Fragment } from 'react';

// components
import { FormWrapper, FormSubmitWrapper , FormTitleWrapper} from './styles';
import { FormItem } from './FormItem';

// 型
interface IApiErrors {
  email?: Array<string>;
  password?: Array<string>;
  full_messages: Array<string>;
}

interface ILoginFormProps {
  errors: any;
  control: any;
  apiErrors: IApiErrors | undefined;
  ClickSubmit(): any;
  isDisabled(): boolean;
  onSubmitLabel(): string;
}

export const LoginForm:VFC<ILoginFormProps> = ({
  ClickSubmit,
  isDisabled,
  onSubmitLabel,
  errors,
  control,
  apiErrors,
}) =>{
  return(
    <Fragment>
      <FormTitleWrapper>Login</FormTitleWrapper>
      <FormWrapper onSubmit={ClickSubmit()}>

        <FormItem
          errorsProperty={errors.email}
          control={control}
          apiErrorProperty={ apiErrors && apiErrors.email}
          formLabel={"Email:"}
          errorMessage={"登録したメールアドレスを入力してください"}
          apiMessagePropertyName={"メールアドレス"}
          nameAttribute={"email"}
          typeAttribute={"email"}
          rules={{ required: true , maxLength: 255}}
        />

        <FormItem
          errorsProperty={errors.password}
          control={control}
          apiErrorProperty={ apiErrors && apiErrors.password}
          formLabel={"パスワード:"}
          errorMessage={"正しいパスワードを入力してください"}
          apiMessagePropertyName={"パスワード"}
          nameAttribute={"password"}
          typeAttribute={"password"}
          rules={{ required: true,minLength: 6, maxLength: 128}}
        />

        <FormSubmitWrapper
          type="submit"
          disabled={isDisabled()}>
          {onSubmitLabel()}
        </FormSubmitWrapper>

      </FormWrapper>
    </Fragment>
  );
}