import * as React from "react";
import { FC, useContext, useReducer, useState } from "react";
import styled from "styled-components";
import { BaseButton } from "../components/shared_style";
import { TransitionProps } from "@mui/material/transitions";
import {
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, InputLabel } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

// apis
import { postContact } from "../apis/contact";

//contexts
import { ContactContext } from "../contexts/Contact";
import { AuthContext } from "../contexts/Auth";
import { MessageContext } from "../contexts/Message";

// reducers
import {
  initialState as reducerInitialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// helpers
import { onSubmitText, isDisabled } from "../helpers";

// constants
import { HTTP_STATUS_CODE } from "../constants";

const Submit = styled(BaseButton)`
  margin-top: 2rem;
  background-color: royalblue;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
`;

export const FormWrapper = styled.form`
  margin: 0 auto;
  width: 80vw;
  @media screen and (min-width: 980px) {
    width: 30vw;
  } ;
`;

const FormItemWrapper = styled.div`
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  margin: 0.6rem auto auto auto;
  color: red;
  font-size: 0.9rem;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// 型
interface IFormValues {
  name: string;
  email: string;
  overView: string;
  content: string;
}

interface IApiErrors {
  name?: Array<string>;
  email?: Array<string>;
  over_view?: Array<string>;
  content?: Array<string>;
}

export const Contact: FC = () => {
  const { open, setOpenContact } = useContext(ContactContext);
  const { currentUser } = useContext(AuthContext);
  const { setMessage } = useContext(MessageContext);
  const [apiErrors, setApiError] = useState<null | IApiErrors>(null);
  const [submitState, dispatch] = useReducer(
    submitReducer,
    reducerInitialState
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();

  const handleClose = () => {
    setOpenContact(false);
  };

  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING });
    postContact({
      name: formValues.name,
      email: formValues.email,
      overView: formValues.overView,
      content: formValues.content,
    })
      .then((data): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        setOpenContact(false);
        setMessage(data.message);
        setApiError(null);
      })
      .catch((e): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (e.response.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
          setApiError(e.response.data.errors);
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return open ? (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      data-testid="contact"
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Contact
          </Typography>
        </Toolbar>
      </AppBar>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} data-testid="contactForm">
        <FormItemWrapper>
          <InputLabel>
            Name
            {apiErrors?.name?.map((message: string, index: number) => (
              <ErrorMessage
                key={`name-${index}`}
                data-testid="nameApiError"
              >{`名前${message}`}</ErrorMessage>
            ))}
            {errors.name && (
              <ErrorMessage data-testid="nameError">
                1文字以上、50文字以内で入力してください
              </ErrorMessage>
            )}
            <Controller
              name="name"
              control={control}
              rules={{ required: true, maxLength: 50 }}
              defaultValue={currentUser ? currentUser.data.name : "未登録"}
              shouldUnregister
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  autoFocus={true}
                  autoComplete="username"
                  fullWidth
                  inputProps={{
                    "data-testid": "nameArea",
                  }}
                />
              )}
            />
          </InputLabel>
        </FormItemWrapper>
        <FormItemWrapper>
          <InputLabel>
            Email
            {apiErrors?.email?.map((message: string, index: number) => (
              <ErrorMessage
                key={`email-${index}`}
                data-testid="emailApiError"
              >{`メールアドレス${message}`}</ErrorMessage>
            ))}
            {errors.email && (
              <ErrorMessage data-testid="emailError">
                1文字以上、255文字以内で入力してください
              </ErrorMessage>
            )}
            <Controller
              name="email"
              control={control}
              rules={{ required: true, maxLength: 255 }}
              defaultValue={currentUser ? currentUser.data.email : ""}
              shouldUnregister
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  autoFocus={false}
                  autoComplete="email"
                  fullWidth
                  inputProps={{
                    "data-testid": "emailArea",
                    placeholder: "連絡可能なメールアドレスを入力してください",
                  }}
                />
              )}
            />
          </InputLabel>
        </FormItemWrapper>
        <FormItemWrapper>
          <InputLabel>
            概要
            {apiErrors?.over_view?.map((message: string, index: number) => (
              <ErrorMessage
                key={`over_view-${index}`}
                data-testid="overViewApiError"
              >{`概要${message}`}</ErrorMessage>
            ))}
            {errors.overView && (
              <ErrorMessage data-testid="overViewError">
                50文字まで入力できます
              </ErrorMessage>
            )}
            <Controller
              name="overView"
              control={control}
              rules={{ maxLength: 50 }}
              defaultValue={""}
              shouldUnregister
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  autoFocus={true}
                  autoComplete="text"
                  fullWidth
                  inputProps={{
                    "data-testid": "overViewArea",
                    placeholder: "50文字まで入力可能です",
                  }}
                />
              )}
            />
          </InputLabel>
        </FormItemWrapper>
        <FormItemWrapper>
          <InputLabel>
            お問い合わせ内容
            {apiErrors?.content?.map((message: string, index: number) => (
              <ErrorMessage
                key={`content-${index}`}
                data-testid="contentApiError"
              >{`問い合わせ内容${message}`}</ErrorMessage>
            ))}
            {errors.content && (
              <ErrorMessage data-testid="contentError">
                1文字以上、1000文字以内で入力してください
              </ErrorMessage>
            )}
            <Controller
              name="content"
              control={control}
              rules={{ required: true, maxLength: 1000 }}
              defaultValue={""}
              shouldUnregister
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  autoFocus={true}
                  autoComplete="text"
                  fullWidth
                  inputProps={{
                    "data-testid": "contentArea",
                    placeholder: "1000文字まで入力可能です",
                  }}
                />
              )}
            />
          </InputLabel>
        </FormItemWrapper>
        <Submit
          type="submit"
          disabled={isDisabled(submitState.postState)}
          data-testid="formSubmit"
        >
          {onSubmitText(submitState.postState, "送信する")}
        </Submit>
      </FormWrapper>
    </Dialog>
  ) : null;
};
