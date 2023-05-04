import {
  forwardRef,
  FC,
  useReducer,
  useState,
  ReactElement,
  Fragment,
} from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import { TextField, InputLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

// apis
import { postContact } from "../apis/contact";

// recoils
import { contactAtom } from "../recoils/Contact";
import { authAtom } from "../recoils/Auth";
import { messageAtom } from "../recoils/Message";
import { Head } from "../Head";

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

// types
import {
  IContactResultErrors as IResultErrors,
  IContactFormValues as IFormValues,
} from "../types/containers";

export const FormTitle = styled.h1`
  text-align: center;
  color: limegreen;
  letter-spacing: 0.1rem;
  margin-top: 20vh;
`;

export const Form = styled.form`
  margin: 1rem auto;
  width: 80vw;
  padding: 0 10% 5% 10%;
  @media screen and (min-width: 980px) {
    width: 30vw;
  }
`;

const ItemWrapper = styled.div`
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  margin: 0.6rem auto auto auto;
  color: red;
  font-size: 0.9rem;
`;

const Submit = styled(BaseButton)`
  margin-top: 2rem;
  background-color: limegreen;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
`;

const transition = forwardRef<
  unknown,
  TransitionProps & { children: ReactElement }
>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

transition.displayName = "Transition";

export const Contact: FC = () => {
  const currentUser = useRecoilValue(authAtom);
  const [open, setContact] = useRecoilState(contactAtom);

  const setMessage = useSetRecoilState(messageAtom);
  const [resultErrors, setResultError] = useState<null | IResultErrors>(null);
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
    setContact(false);
  };

  const onSubmit = async (formValues: IFormValues): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });
    await postContact({
      name: formValues.name,
      email: formValues.email,
      over_view: formValues.overView || "無題",
      content: formValues.content,
    })
      .then((data): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        setMessage(data.message);
        setContact(false);
        setResultError(null);
      })
      .catch((e): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (e.response?.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
          setResultError(e.response.data.errors);
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  return (
    <Fragment>
      <Head title="Contact" />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        data-testid="contact"
      >
        <AppBar
          sx={{ position: "relative" }}
          style={{ color: "limegreen", backgroundColor: "white" }}
        >
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
        <FormTitle>お問い合わせ</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)} data-testid="contactForm">
          <InputLabel>
            <ItemWrapper>
              {resultErrors?.name?.map((message: string, index: number) => (
                <ErrorMessage
                  key={`name-${index}`}
                  data-testid="nameResultError"
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
                defaultValue={currentUser?.name || "未登録"}
                shouldUnregister
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="Name(必須)"
                    autoComplete="username"
                    fullWidth
                    inputProps={{
                      "data-testid": "nameArea",
                    }}
                  />
                )}
              />
            </ItemWrapper>
          </InputLabel>
          <InputLabel>
            <ItemWrapper>
              {resultErrors?.email?.map((message: string, index: number) => (
                <ErrorMessage
                  key={`email-${index}`}
                  data-testid="emailResultError"
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
                defaultValue={currentUser?.email || ""}
                shouldUnregister
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email(必須)"
                    autoComplete="email"
                    fullWidth
                    inputProps={{
                      "data-testid": "emailArea",
                      placeholder: "連絡可能なメールアドレスを入力してください",
                    }}
                  />
                )}
              />
            </ItemWrapper>
          </InputLabel>
          <InputLabel>
            <ItemWrapper>
              {resultErrors?.over_view?.map(
                (message: string, index: number) => (
                  <ErrorMessage
                    key={`over_view-${index}`}
                    data-testid="overViewResultError"
                  >{`概要${message}`}</ErrorMessage>
                )
              )}
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
                    label="概要"
                    autoComplete="text"
                    fullWidth
                    multiline
                    inputProps={{
                      "data-testid": "overViewArea",
                      placeholder: "50文字まで入力可能です",
                    }}
                  />
                )}
              />
            </ItemWrapper>
          </InputLabel>
          <InputLabel>
            <ItemWrapper>
              {resultErrors?.content?.map((message: string, index: number) => (
                <ErrorMessage
                  key={`content-${index}`}
                  data-testid="contentResultError"
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
                    label="お問い合わせ内容(必須)"
                    autoComplete="text"
                    fullWidth
                    multiline
                    inputProps={{
                      "data-testid": "contentArea",
                      placeholder: "1000文字まで入力可能です",
                    }}
                  />
                )}
              />
            </ItemWrapper>
          </InputLabel>
          <Submit
            type="submit"
            disabled={isDisabled(submitState.postState)}
            data-testid="formSubmit"
          >
            {onSubmitText(submitState.postState, "送信する")}
          </Submit>
        </Form>
      </Dialog>
    </Fragment>
  );
};
