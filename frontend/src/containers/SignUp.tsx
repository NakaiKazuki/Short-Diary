import React, { VFC, Fragment } from 'react';
import { useForm ,Controller} from 'react-hook-form';
import styled from 'styled-components';

// components
import { Header } from '../components/Header';
import { FormTitleWrapper, FormLabelWrapper ,FormItemsWrapper,
         FormItemWrapper, FormSubmitWrapper,FormErrorMessageWrapper}
         from '../components/Forms/Users';

// apis
import { postRegistration } from '../apis/users/registrations';
// responses
import { HTTP_STATUS_CODE } from '../constants';
// css
const SignUpWrapper = styled.div`
  margin-top: 12vh;
`;

// 型
interface UserInfoProps{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;

}

interface ErrorsProps {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  response: {status: number};
}

export const SignUp:VFC = () => {
  const { handleSubmit, getValues , errors, control } = useForm();

  const onSubmit = (userInfo: UserInfoProps) => {
    postRegistration({
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
      password_confirmation: userInfo.password_confirmation,
    })
    .then((data) =>
     console.log(data)
    )
    .catch((e: ErrorsProps ) => {
      if (e.response.status === HTTP_STATUS_CODE.VALIDATION_FAILED) {
        console.log(e.response)
      } else {
        throw e;
      }
    })
  };


  return(
    <Fragment>
      <Header/>
      <SignUpWrapper>
        <FormTitleWrapper>Sign Up</FormTitleWrapper>
        <FormItemsWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormLabelWrapper>Name:</FormLabelWrapper>
          {errors.name && errors.name.type === "required" && (
            <FormErrorMessageWrapper>名前を入力してください</FormErrorMessageWrapper>
          )}
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            as={
              <FormItemWrapper
                autoFocus
                type="text"
                fullWidth
                data-testid="nameArea"
              />
            }
          />

          <FormLabelWrapper>Email:</FormLabelWrapper>
          {errors.email && errors.email.type === "required" && (
            <FormErrorMessageWrapper>メールアドレスを入力してください</FormErrorMessageWrapper>
          )}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            as={
              <FormItemWrapper
                type="email"
                fullWidth
                data-testid="emailArea"
              />
            }
          />

          <FormLabelWrapper>パスワード（6文字以上）:</FormLabelWrapper>
          {errors.password && errors.password.type === "required" && (
            <FormErrorMessageWrapper>パスワードを入力してください</FormErrorMessageWrapper>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <FormErrorMessageWrapper>パスワードは6文字以上で登録してください</FormErrorMessageWrapper>
          )}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true ,minLength: 6 }}
            as={
              <FormItemWrapper
                type="password"
                fullWidth
                data-testid="passwordArea"
              />
            }
          />

          <FormLabelWrapper>確認用パスワード</FormLabelWrapper>
          {errors.password_confirmation && errors.password_confirmation.type === "required" && (
            <FormErrorMessageWrapper>確認用パスワードを入力してください</FormErrorMessageWrapper>
          )}
          {errors.password_confirmation && errors.password_confirmation.type === "validate" && (
            <FormErrorMessageWrapper>パスワードと一致していません</FormErrorMessageWrapper>
          )}
          <Controller
            name="password_confirmation"
            control={control}
            defaultValue=""
            rules={{required: true, validate: value => value === getValues("password") }}
            as={
              <FormItemWrapper
                type="password"
                fullWidth
                data-testid="passwordConfirmationArea"
              />
            }
          />

          <FormSubmitWrapper type="submit">Sign Up!</FormSubmitWrapper>
        </FormItemsWrapper>
      </SignUpWrapper>
    </Fragment>
  )
}