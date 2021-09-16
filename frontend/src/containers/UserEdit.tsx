import { VFC, useState, useReducer, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

//contexts
import { AuthContext } from "../contexts/Auth";
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
import { putRegistration } from "../apis/users/registrations";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// forminfo
import { UserEditFormInfo, UserEditLinkInfo } from "../formInfo";

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// helpers
import { onSubmitText, isDisabled } from "../helpers";

// css
const UserEditWrapper = styled.div`
  width: 100vw;
  min-height: 81vh;
  margin-top: 6.6vh;
  padding-top: 5.4vh;
`;

const GuestErrorMessage = styled.p`
  text-align: center;
  margin: 0.6rem auto auto auto;
  color: red;
  font-size: 0.9rem;
`;

// 型
// Formから送信される情報
interface IFormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
}

// エラーメッセージ
interface IApiErrors {
  name?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  current_password?: Array<string>;
  guest?: Array<string>;
}

export const UserEdit: VFC = () => {
  const history = useHistory();
  const [apiErrors, setErrorMessage] = useState<IApiErrors | undefined>(
    undefined
  );
  const [state, dispatch] = useReducer(submitReducer, initialState);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { setMessage } = useContext(MessageContext);
  const { handleSubmit, control, errors } = useForm<IFormValues>();
  const formInfo = UserEditFormInfo(
    errors,
    control,
    apiErrors,
    currentUser!.data
  );
  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING });
    putRegistration(currentUser!.headers, {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
      current_password: formValues.current_password,
    })
      .then((res) => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        setCurrentUser({
          ...currentUser,
          ...res.data,
          headers: res.headers,
        });
        setMessage("登録情報の編集に成功しました。");
        history.push("/");
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (e.response.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
          setErrorMessage(e.response.data.errors);
        } else if (
          e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
          e.response.status === HTTP_STATUS_CODE.FORBIDDEN
        ) {
          setCurrentUser(undefined);
          history.push("/login");
        } else {
          console.error(e);
          process.exit(1);
        }
      });
  };

  return (
    <UserEditWrapper>
      <FormTitle>Profile Edit</FormTitle>

      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="userEditForm">
        {apiErrors?.guest?.map((message: string, index: number) => (
          <GuestErrorMessage
            key={`guestError-${index}`}
            data-testid="guestApiError"
          >
            {message}
          </GuestErrorMessage>
        ))}

        <FormItem formInfo={formInfo.name} />

        <FormItem formInfo={formInfo.email} />

        <FormItem formInfo={formInfo.password} />

        <FormItem formInfo={formInfo.password_confirmation} />

        <FormItem formInfo={formInfo.current_password} />

        <FormSubmit
          isDisabled={isDisabled(state.postState)}
          onSubmitText={onSubmitText(state.postState, "Profile Edit!")}
        />
      </FormWrapper>
      <FormLinks linkInfo={UserEditLinkInfo} />
    </UserEditWrapper>
  );
};
