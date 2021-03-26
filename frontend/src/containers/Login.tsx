import React, { VFC, Fragment } from 'react';
import { useForm ,Controller} from 'react-hook-form';
import styled from 'styled-components';

// components
import { Header } from '../components/Header';
import { FormTitleWrapper, FormLabelWrapper ,FormItemsWrapper,
         FormItemWrapper, FormSubmitWrapper,FormErrorMessageWrapper}
         from '../components/Forms/Users';

// css
const LoginWrapper = styled.div`
  margin-top: 12vh;
`;

// 型
// interface DataProps{
//   email: string;
//   password: string;
// }

export const Login:VFC = () => {

  const { handleSubmit, errors, control } = useForm();
  const onSubmit = () => {
    console.log("ボタン押された");
  }

  return(
    <Fragment>
      <Header/>
      <LoginWrapper>
      <FormTitleWrapper>Login</FormTitleWrapper>
        <FormItemsWrapper onSubmit={handleSubmit(onSubmit)}>

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

          <FormLabelWrapper>パスワード:</FormLabelWrapper>
          {errors.password && errors.password.type === "required" && (
            <FormErrorMessageWrapper>パスワードを入力してください</FormErrorMessageWrapper>
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

          <FormSubmitWrapper type="submit">Sign Up!</FormSubmitWrapper>
        </FormItemsWrapper>
      </LoginWrapper>
    </Fragment>
  )
}