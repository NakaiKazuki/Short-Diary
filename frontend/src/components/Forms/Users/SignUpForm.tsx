import React, { VFC, Fragment } from 'react';

// components
import { FormWrapper, FormSubmitWrapper, FormTitleWrapper } from './styles';
import {FormItem} from './FormItem';

// 型
interface IApiErrors {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  full_messages: Array<string>;
}

interface ISignUpFormProps {
  errors: any;
  control: any;
  apiErrors: IApiErrors | undefined;
  ClickSubmit(): any;
  isDisabled(): boolean;
  onSubmitLabel(): string;
}

export const SignUpForm: VFC<ISignUpFormProps> = ({
  ClickSubmit,
  isDisabled,
  onSubmitLabel,
  errors,
  control,
  apiErrors,
}) =>{
  return(
    <Fragment>
      <FormTitleWrapper>Sign Up</FormTitleWrapper>
      <FormWrapper onSubmit={ClickSubmit()}>
        <FormItem
          errorsProperty={errors.name}
          control={control}
          apiErrorProperty={ apiErrors?.name}
          formLabel={"Name:"}
          errorMessage={"1文字以上、50文字以内で入力してください"}
          apiMessagePropertyName={"名前"}
          nameAttribute={"name"}
          typeAttribute={"text"}
          rules={{ required: true, maxLength: 50 }}
        />

        <FormItem
          errorsProperty={errors.email}
          control={control}
          apiErrorProperty={ apiErrors && apiErrors.email }
          formLabel={"Email:"}
          errorMessage={"1文字以上、255文字以内で入力してください"}
          apiMessagePropertyName={"メールアドレス"}
          nameAttribute={"email"}
          typeAttribute={"email"}
          rules={{ required: true , maxLength: 255}}
        />

        <FormItem
          errorsProperty={errors.password}
          control={control}
          apiErrorProperty={ apiErrors && apiErrors.password}
          formLabel={"パスワード(6文字以上):"}
          errorMessage={"6文字以上、128文字以内で入力してください"}
          apiMessagePropertyName={"パスワード"}
          nameAttribute={"password"}
          typeAttribute={"password"}
          rules={{ required: true,minLength: 6, maxLength: 128}}
        />

        <FormItem
          errorsProperty={errors.password_confirmation}
          control={control}
          apiErrorProperty={ apiErrors && apiErrors.password_confirmation}
          formLabel={"確認用パスワード:"}
          errorMessage={"パスワードと同じ内容を入力してください"}
          apiMessagePropertyName={"確認用パスワード"}
          nameAttribute={"password_confirmation"}
          typeAttribute={"password_confirmation"}
          rules={{required: true, minLength: 6, maxLength: 128}}
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