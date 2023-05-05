import { FC, useReducer } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
// atoms
import { authAtom } from "../recoils/Auth";

// apis
import { newGuestSession } from "../apis/users/sessions";

// reducers
import {
  initialState as initialSubmit,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// helpers
import { removeUserCookies, setUserCookies } from "../helpers";

// components
import { CanvasContainer } from "../components/logoutHome";

// css
const LogoutHomeContainer = styled(motion.div)`
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

  return (
    <LogoutHomeContainer
      exit={{ opacity: 1 }}
      transition={{ duration: 3 }}
      data-testid="logoutHome"
    >
      <CanvasContainer
        postState={submitState.postState}
        onSignUpButton={() => navigate("/signup")}
        onAboutButton={() => navigate("/about")}
        onGuestLoginButton={onGuestLoginButton}
      />
    </LogoutHomeContainer>
  );
};
