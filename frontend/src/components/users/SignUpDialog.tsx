import { forwardRef, FC, ReactElement, Fragment } from "react";
import styled from "styled-components";
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
import { ISignUpDialogProps as IProps } from "../../types/components/users";
// haeder
import { Head } from "../../Head";

// components
import { SignUp } from "../../containers/SignUp";
// css
export const FormTitle = styled.h1`
  text-align: center;
  color: limegreen;
  letter-spacing: 0.1rem;
  margin-top: 20vh;
`;

export const FormWrapper = styled.form`
  margin: 1rem auto;
  width: 80vw;
  padding: 0 10% 5% 10%;
  @media screen and (min-width: 980px) {
    width: 30vw;
  }
`;
const transition = forwardRef<
  unknown,
  TransitionProps & { children: ReactElement }
>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

transition.displayName = "Transition";

export const SignUpDilalog: FC<IProps> = ({ isOpen, handleClose }) => {
  return (
    <Fragment>
      <Head title="SignUpDialog" />
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={transition}
        data-testid="signUpDialog"
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
              SignUp
            </Typography>
          </Toolbar>
        </AppBar>
        <SignUp />
      </Dialog>
    </Fragment>
  );
};
