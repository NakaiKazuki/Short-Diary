import { FC, useReducer, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// recoils
import { authAtom } from "../recoils/Auth";

// types
import { ILogoutHomeInitialState as IInitialState } from "../types/containers";

// apis
import { newGuestSession } from "../apis/users/sessions";

// reducers
import {
  initialState as initialSubmit,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";
import { initialState as initialAbout, aboutReducer } from "../reducers/about";

// helpers
import { removeUserCookies, setUserCookies } from "../helpers";

// components
import { AboutDialog } from "../components/aboutDiarlog";
import { SignUpDilalog } from "../components/users/SignUpDialog";
import { CanvasContainer } from "../components/logoutHome";
// css
const LogoutHomeContainer = styled.div`
  overscroll-behavior: none;
  font-family: "Inter var", sans-serif;
  width: 100%;
  height: 93.5vh;
`;

export const LogoutHome: FC = () => {
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(authAtom);
  const [submitState, dispatchSubmit] = useReducer(
    submitReducer,
    initialSubmit
  );
  const [aboutState, dispatchAbout] = useReducer(aboutReducer, initialAbout);
  const initialState: IInitialState = {
    isDesktop: false,
    isAboutOpen: false,
    isSignUpOpen: false,
  };
  const [state, setState] = useState(initialState);
  const onGuestLoginButton = async (): Promise<void> => {
    dispatchSubmit({ type: submitActionTypes.POSTING });
    await newGuestSession()
      .then((res) => {
        dispatchSubmit({ type: submitActionTypes.POST_SUCCESS });
        setUserCookies(res);
        setCurrentUser(res.data);
        navigate("/");
      })
      .catch((e) => {
        removeUserCookies();
        setCurrentUser(undefined);
        throw e;
      });
  };

  // AboutDialog
  const onAboutOpenButton = (): void =>
    setState({
      ...state,
      isAboutOpen: true,
    });

  const onAboutCloseButton = (): void =>
    setState({
      ...state,
      isAboutOpen: false,
    });

  // SignUpDialog
  const onSignUpOpenButton = (): void =>
    setState({
      ...state,
      isSignUpOpen: true,
    });

  const onSignUpCloseButton = (): void =>
    setState({
      ...state,
      isSignUpOpen: false,
    });

  return (
    <LogoutHomeContainer data-testid="logoutHome">
      <CanvasContainer
        postState={submitState.postState}
        onSignUpOpenButton={onSignUpOpenButton}
        onAboutOpenButton={onAboutOpenButton}
        onGuestLoginButton={onGuestLoginButton}
      />
      <AboutDialog
        isOpen={state.isAboutOpen}
        handleClose={onAboutCloseButton}
        state={aboutState}
        onCategory={(title: string) => dispatchAbout({ title: title })}
        data-testid="aboutDialog"
      />
      <SignUpDilalog
        isOpen={state.isSignUpOpen}
        handleClose={onSignUpCloseButton}
        data-testid="signUpDialog"
      />
    </LogoutHomeContainer>
  );
};
