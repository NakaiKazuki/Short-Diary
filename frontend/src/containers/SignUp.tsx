import React, { VFC, Fragment, useState } from 'react';
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

interface ApiErrorsProps {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  full_messages: Array<string>;
}

export const SignUp:VFC = () => {

  const { handleSubmit, errors, control } = useForm<UserInfoProps>();
  let [apiError, setErrorMessage] = useState<ApiErrorsProps>();

  const onSubmit = (userInfo: UserInfoProps) => {
    postRegistration({
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
      password_confirmation: userInfo.password_confirmation,
    })
    .then(data =>
     console.log(data)
    )
    .catch(e => {
      if (e.response.status === HTTP_STATUS_CODE.VALIDATION_FAILED) {
        setErrorMessage(apiError = e.response.data.errors)
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
          {errors.name &&
            <FormErrorMessageWrapper>1文字以上、50文字以内で入力してください</FormErrorMessageWrapper>
          }
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true, maxLength: 50 }}
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
          {errors.email &&
            <FormErrorMessageWrapper>1文字以上、255文字以内で入力してください</FormErrorMessageWrapper>
          }
          {apiError?.email && apiError.email.map((message: string, index: number) =>
            <FormErrorMessageWrapper key={index}>{`メールアドレス${message}`}</FormErrorMessageWrapper>
          )}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true , maxLength: 255}}
            as={
              <FormItemWrapper
                type="email"
                fullWidth
                data-testid="emailArea"
              />
            }
          />

          <FormLabelWrapper>パスワード(6文字以上):</FormLabelWrapper>
          {errors.password &&
            <FormErrorMessageWrapper>6文字以上、128文字以内で入力してください</FormErrorMessageWrapper>
          }
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true,minLength: 6, maxLength: 128}}
            as={
              <FormItemWrapper
                type="password"
                fullWidth
                data-testid="passwordArea"
              />
            }
          />

          <FormLabelWrapper>確認用パスワード:</FormLabelWrapper>
          {errors.password &&
            <FormErrorMessageWrapper>パスワードと同じ内容を入力してください</FormErrorMessageWrapper>
          }
          {apiError?.password_confirmation && apiError.password_confirmation.map((message: string, index: number) =>
            <FormErrorMessageWrapper key={index}>{`確認用パスワード${message}`}</FormErrorMessageWrapper>
          )}
          <Controller
            name="password_confirmation"
            control={control}
            defaultValue=""
            rules={{required: true, minLength: 6}}
            as={
              <FormItemWrapper
                type="password"
                fullWidth
                data-testid="passwordConfirmationArea"
              />
            }
          />
          <FormSubmitWrapper type="submit" disabled={false}>Sign Up!</FormSubmitWrapper>
        </FormItemsWrapper>
      </SignUpWrapper>
    </Fragment>
  )
}