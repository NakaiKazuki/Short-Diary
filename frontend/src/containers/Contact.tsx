import * as React from "react";
import { FC, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";
import { BaseButton } from "../components/shared_style";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, InputLabel } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

//contexts
import { ContactContext } from "../contexts/Contact";
import { AuthContext } from "../contexts/Auth";

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
  content: string;
}

export const Contact: FC = () => {
  const { open, setOpenContact } = useContext(ContactContext);
  const { currentUser } = useContext(AuthContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>();

  const handleClose = () => {
    setOpenContact(false);
  };

  const onSubmit = () =>{
    console.log("送信ボタンが押されたよ！")
  }
  return open ? (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
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
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormItemWrapper>
          <InputLabel>
            Name
            {errors.name && (
              <ErrorMessage>
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
            {errors.email && (
              <ErrorMessage>
                1文字以上、255文字以内で入力してください
              </ErrorMessage>
            )}
            <Controller
              name="email"
              control={control}
              rules={{ required: true, maxLength: 255 }}
              defaultValue={currentUser ? currentUser.data.email : undefined}
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
                    placeholder: "受信希望のアドレスを入力してください",
                  }}
                />
              )}
            />
          </InputLabel>
        </FormItemWrapper>
        <FormItemWrapper>
          <InputLabel>
            お問い合わせ内容
            {errors.content && (
              <ErrorMessage>
                1文字以上、1000文字以内で入力してください
              </ErrorMessage>
            )}
            <Controller
              name="content"
              control={control}
              rules={{ required: true, maxLength: 1000 }}
              defaultValue={undefined}
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
        <Submit type="submit">送信する</Submit>
      </FormWrapper>
    </Dialog>
  ) : null;
};
