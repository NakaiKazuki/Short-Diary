import { FC, useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

// atoms
import { messageAtom } from "../atoms";

// components
import {
  FormLinks,
  FormSubmit,
  FormTitle,
  Form,
  Name,
  Email,
  Password,
  PasswordConfirmation,
} from "../components/users/forms";
// apis
import { postRegistration } from "../apis/users/registrations";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// helpers
import { onSubmitText, isDisabled } from "../helpers";

// types
import {
  IUsersFormValues as IFormValues,
  IUsersResultErrors as IResultErrors,
} from "../types/containers";

import { TLinks } from "../types/containers";

const Container = styled.div`
  min-height: 93.5vh;
  padding-top: 17vh;
  width: 100%;
  @media screen and (max-width: 480px) {
    margin-bottom: 3rem;
  }
`;

export const SignUp: FC = () => {
  const navigate = useNavigate();
  const [resultErrors, setErrorMessage] = useState<
    | Pick<
        IResultErrors,
        "name" | "email" | "password" | "password_confirmation"
      >
    | undefined
  >(undefined);
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const setMessage = useSetRecoilState(messageAtom);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();

  const linkInfo: TLinks = [
    {
      url: "/login",
      text: "登録済みの方はこちら",
    },
  ];

  const onSubmit = async (formValues: IFormValues): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });
    await postRegistration({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
    })
      .then(() => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        setMessage(
          "認証用メールを送信しました。登録されたメールアドレスから認証を済ませてください。"
        );
        navigate("/", { replace: true });
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (
          e.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
          e.response?.status === HTTP_STATUS_CODE.UNPROCESSABLE
        ) {
          setErrorMessage(e.response.data.errors);
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return (
    <Container>
      <FormTitle>Sign Up</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)} data-testid="signUpForm">
        <Name
          control={control}
          autoFocus={true}
          defaultValue=""
          resultErrors={resultErrors?.name}
          errors={errors.name}
          required={true}
        />

        <Email
          control={control}
          autoFocus={false}
          defaultValue=""
          resultErrors={resultErrors?.email}
          errors={errors.email}
          required={true}
        />

        <Password
          control={control}
          autoFocus={false}
          resultErrors={resultErrors?.password}
          errors={errors.password}
          required={true}
        />

        <PasswordConfirmation
          control={control}
          autoFocus={false}
          resultErrors={resultErrors?.password_confirmation}
          errors={errors.password_confirmation}
          required={true}
        />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "Sign Up!")}
        />
      </Form>
      <FormLinks linkInfo={linkInfo} />
    </Container>
  );
};
