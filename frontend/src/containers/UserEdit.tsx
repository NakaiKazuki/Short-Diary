import { FC, useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

// atoms
import { authAtom, messageAtom } from "../atoms";

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
  CurrentPassword,
} from "../components/users/forms";
// apis
import { putRegistration } from "../apis/users/registrations";

// constants
import { HTTP_STATUS_CODE } from "../constants";

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// helpers
import {
  isDisabled,
  onSubmitText,
  removeUserCookies,
  setUserCookies,
} from "../helpers";

// types
import {
  IUsersFormValues as IFormValues,
  IUsersResultErrors as IResultErrors,
  TLinks,
} from "../types/containers";

// css
const Container = styled.div`
  min-height: 93.5vh;
  padding-top: 17vh;
  width: 100%;
  @media screen and (max-width: 480px) {
    margin-bottom: 5rem;
  }
`;

const GuestMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0.6rem auto auto auto;
  text-align: center;
`;

export const UserEdit: FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(authAtom);

  const [resultErrors, setErrorMessage] = useState<IResultErrors | undefined>(
    undefined
  );
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const setMessage = useSetRecoilState(messageAtom);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();

  if (!currentUser) {
    navigate("../login", { replace: true });
    return null;
  }

  // 送信ボタン下にあるリンクの情報
  const linkInfo: TLinks = [
    {
      url: "/",
      text: "Home",
    },
  ];

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
        setUserCookies(res);
        setCurrentUser(res.data.data);
        setMessage("登録情報の編集に成功しました。");
        navigate("../", { replace: true });
      })
      .catch((e) => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (e.response?.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
          setErrorMessage(e.response.data.errors);
        } else if (
          e.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
          e.response?.status === HTTP_STATUS_CODE.FORBIDDEN
        ) {
          setCurrentUser(undefined);
          removeUserCookies();
          navigate("/login", { replace: true });
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return (
    <Container>
      <FormTitle>Profile Edit</FormTitle>

      <Form onSubmit={handleSubmit(onSubmit)} data-testid="userEditForm">
        {resultErrors?.guest?.map((message: string, index: number) => (
          <GuestMessage
            key={`guestError-${index}`}
            data-testid="guestResultError"
          >
            {message}
          </GuestMessage>
        ))}

        <Name
          control={control}
          autoFocus={true}
          defaultValue={currentUser.name}
          resultErrors={resultErrors?.name}
          errors={errors.name}
          required={true}
        />

        <Email
          control={control}
          autoFocus={false}
          defaultValue={currentUser.email}
          resultErrors={resultErrors?.email}
          errors={errors.email}
          required={true}
        />

        <Password
          control={control}
          autoFocus={false}
          resultErrors={resultErrors?.password}
          errors={errors.password}
          required={false}
        />

        <PasswordConfirmation
          control={control}
          autoFocus={false}
          resultErrors={resultErrors?.password_confirmation}
          errors={errors.password_confirmation}
          required={false}
        />

        <CurrentPassword
          control={control}
          autoFocus={false}
          resultErrors={resultErrors?.current_password}
          errors={errors.current_password}
          required={true}
        />

        <FormSubmit
          isDisabled={isDisabled(submitState.postState)}
          onSubmitText={onSubmitText(submitState.postState, "編集する")}
        />
      </Form>
      <FormLinks linkInfo={linkInfo} />
    </Container>
  );
};
