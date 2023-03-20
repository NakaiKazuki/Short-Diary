import { FC, useState, useReducer, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//contexts
import { MessageContext } from "../contexts/Message";

// components
import {
  FormItem,
  FormSubmit,
  FormLinks,
  FormTitle,
  FormWrapper,
} from "../components/users";

// apis
import { postRegistration } from "../apis/users/registrations";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// formitemsinfo
import { signUpFormInfo, signUpLinkInfo } from "../formInfo";

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
  IUsersApiErrors as IApiErrors,
} from "../types/containers";

// css
const SignUpWrapper = styled.div`
  width: 100vw;
  min-height: 81vh;
  margin-top: 6.6vh;
  padding-top: 5.4vh;
`;

export const SignUp: FC = () => {
  const navigate = useNavigate();
  const [apiErrors, setErrorMessage] = useState<
    | Pick<IApiErrors, "name" | "email" | "password" | "password_confirmation">
    | undefined
  >(undefined);
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const { setMessage } = useContext(MessageContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();
  const formInfo = signUpFormInfo(errors, apiErrors);

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
          "認証用メールを送信しました。登録時のメールアドレスから認証を済ませてください。"
        );
        navigate("/", { replace: true });
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (
          e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
          e.response.status === HTTP_STATUS_CODE.UNPROCESSABLE
        ) {
          setErrorMessage(e.response.data.errors);
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return (
    <SignUpWrapper>
      <FormTitle>Sign Up</FormTitle>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="signUpForm">
        <FormItem formInfo={formInfo.name} control={control} />

        <FormItem formInfo={formInfo.email} control={control} />

        <FormItem formInfo={formInfo.password} control={control} />

        <FormItem formInfo={formInfo.password_confirmation} control={control} />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "SignUp!")}
        />
      </FormWrapper>
      <FormLinks linkInfo={signUpLinkInfo} />
    </SignUpWrapper>
  );
};
