import { VFC, useState, useReducer, useContext } from "react";
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

// css
const SignUpWrapper = styled.div`
  width: 100vw;
  min-height: 81vh;
  margin-top: 6.6vh;
  padding-top: 5.4vh;
`;

// 型
// Formから送信される情報
interface IFormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// エラーメッセージ
export interface IApiErrors {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
}

export const SignUp: VFC = () => {
  const navigate = useNavigate();
  const [apiErrors, setErrorMessage] = useState<IApiErrors | undefined>(
    undefined
  );
  const [state, dispatch] = useReducer(submitReducer, initialState);
  const { setMessage } = useContext(MessageContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();
  const formInfo = signUpFormInfo(errors, control, apiErrors);

  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING });
    postRegistration({
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
        navigate("/");
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (
          e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
          e.response.status === HTTP_STATUS_CODE.UNPROCESSABLE
        ) {
          setErrorMessage(e.response.data.errors);
        } else {
          process.exit(1);
        }
      });
  };

  return (
    <SignUpWrapper>
      <FormTitle>Sign Up</FormTitle>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="signUpForm">
        <FormItem formInfo={formInfo.name} />

        <FormItem formInfo={formInfo.email} />

        <FormItem formInfo={formInfo.password} />

        <FormItem formInfo={formInfo.password_confirmation} />

        <FormSubmit
          isDisabled={isDisabled(state.postState)}
          onSubmitText={onSubmitText(state.postState, "SignUp!")}
        />
      </FormWrapper>
      <FormLinks linkInfo={signUpLinkInfo} />
    </SignUpWrapper>
  );
};
