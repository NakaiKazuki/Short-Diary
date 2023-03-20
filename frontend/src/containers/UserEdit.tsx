import { FC, useState, useReducer, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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

// types
import {
  IUsersFormValues as IFormValues,
  IUsersApiErrors as IApiErrors,
} from "../types/containers";

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

export const UserEdit: FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [apiErrors, setErrorMessage] = useState<
    | Pick<
      IApiErrors,
      | "name"
      | "password"
      | "password_confirmation"
      | "current_password"
      | "guest"
    >
    | undefined
  >(undefined);
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const { setMessage } = useContext(MessageContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();

  if (!currentUser) {
    navigate("../login", { replace: true });
    return null;
  }

  const formInfo = UserEditFormInfo(errors, apiErrors, currentUser);

  const onSubmit = async (formValues: IFormValues): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });
    await putRegistration({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
      current_password: formValues.current_password,
    })
      .then((res) => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        setCurrentUser(res.data);
        Cookies.set("uid", res.headers["uid"]);
        Cookies.set("client", res.headers["client"]);
        Cookies.set("access-token", res.headers["access-token"]);
        setMessage("登録情報の編集に成功しました。");
        navigate("../", { replace: true });
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
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          navigate("/login", { replace: true });
        } else {
          console.error(e);
          throw e;
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
        <FormItem formInfo={formInfo.name} control={control} />

        <FormItem formInfo={formInfo.email} control={control} />

        <FormItem formInfo={formInfo.password} control={control} />

        <FormItem formInfo={formInfo.password_confirmation} control={control} />

        <FormItem formInfo={formInfo.current_password} control={control} />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "Profile Edit!")}
        />
      </FormWrapper>
      <FormLinks linkInfo={UserEditLinkInfo} />
    </UserEditWrapper>
  );
};
