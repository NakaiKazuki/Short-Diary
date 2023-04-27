import { FC, useReducer, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

// recoils
import { authAtom } from "../recoils/Auth";
// types
import { ILogoutHomeInitialState as IInitialState } from "../types/containers";
// apis
import { newGuestSession } from "../apis/users/sessions";

// helpers
import {
  onSubmitText,
  isDisabled,
  removeUserCookies,
  setUserCookies,
} from "../helpers";

// reducers
import {
  initialState as initialSubmit,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";
import { initialState as initialAbout, aboutReducer } from "../reducers/about";

// components
import { SignUp } from "./SignUp";
import { AboutDialog } from "../components/aboutDiarlog";
import { BaseButton } from "../components/shared_style";
import { Sample } from "../components/Sample";

// images
import LeftHome from "../images/lefthome.jpg";
// css
const LogoutHomeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  min-height: 94.5vh;
  overflow: auto;
`;

const LeftWrapper = styled.div`
  @media screen and (min-width: 980px) {
    flex: 0.5;
    top: 0;
    max-height: 94.5vh;
  }
  @media screen and (max-width: 979px) {
    width: 100vw;
  }
  @media screen and (max-width: 480px) {
    min-height: 70vh;
  }
`;

const ContentWrapper = styled.div`
  background-image: url(${LeftHome});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  min-height: 94vh;
`;

const Content = styled.div`
  margin-top: 16vh;
  display: inline-block;
  @media screen and (min-width: 481px) {
    margin-left: 10vw;
  }
  @media screen and (max-width: 480px) {
    margin-top: 15vh;
  }
`;

const MotionWrapper = styled(motion.div)`
  clip-path: circle(0% at 0 0);
`;

const Heading = styled.h1`
  position: relative;
  padding: 0.5rem;
  background: limegreen;
  color: white;
  font-size: 3rem;
  &:before {
    position: absolute;
    content: "";
    top: 100%;
    left: 0;
    border: none;
    border-bottom: solid 1rem transparent;
    border-right: solid 1.3rem rgb(149, 158, 155);
  }
  @media screen and (min-width: 481px) {
    font-size: 3rem;
    }
`;

const Paragraph = styled.p`
  margin: 10% 0 0 5%;
  padding: 5%;
  line-height: 1.7;
  border-left: solid 0.3rem limegreen;
  font-size: 1.3rem;
`;

const ButtonsWrapper = styled.span`
  margin-top: 10%;
  display: flex;
  justify-content: space-evenly;
`;

const CustomButton = styled(BaseButton)`
  border-style: none;
  letter-spacing: 0.2rem;
  color: white;
  background-color: limegreen;
  font-size: 1.2rem;
  padding: 0.5rem;
`;

const ProfButton = styled(CustomButton)`
  margin-bottom:2rem;
`;

const RightWrapper = styled.div`
  margin-bottom: 7vh;
  @media screen and (min-width: 980px) {
    position: sticky;
    position: -webkit-sticky; /*Safari用*/
    flex: 0.5;
    top: 0;
    margin: 0 auto 7vh auto;
  }
  @media screen and (max-width: 979px) {
    width: 100vw;
  }
`;

const variants = {
  open: {
    clipPath: "circle(150% at 0 0)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
};

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
    open: false,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const handleResize = () =>
      setState({
        ...state,
        isDesktop: window.innerWidth >= 979,
      });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  const onOpenButton = (): void =>
    setState({
      ...state,
      open: true,
    });

  const onCloseButton = (): void =>
    setState({
      ...state,
      open: false,
    });
  // AboutDialogここまで

  return (
    <LogoutHomeWrapper>
      <LeftWrapper data-testid="leftWrapper">
        <ContentWrapper>
          <Content>
            <MotionWrapper variants={variants} animate="open">
              <Heading>毎日の出来事を記録しよう</Heading>
              <Paragraph>
                日記を付けたいけど、文章を書くのは面倒だと思ったことはありませんか？
                <br />
                Short
                Diaryでは日々の出来事、思いつきをで記録することが目的なので
                <br />
                メモ感覚で日記をつけることができます！
                <br />
                さっそく登録して日記を付けよう!
                <br />
                下記のゲストログインボタンから登録後と同じ内容で使用できます！
              </Paragraph>
            </MotionWrapper>
            <ButtonsWrapper>
              <Link to="/signup" data-testid="signUpLink">
                <CustomButton type="button">ユーザー登録</CustomButton>
              </Link>
              <CustomButton
                type="button"
                onClick={onGuestLoginButton}
                disabled={isDisabled(submitState.postState)}
                data-testid="guestLoginButton"
              >
                {onSubmitText(submitState.postState, "ゲストログイン")}
              </CustomButton>
            </ButtonsWrapper>
            <ButtonsWrapper>
              <ProfButton
                type="button"
                onClick={onOpenButton}
                data-testid="aboutButton"
              >
                アプリと制作者情報
              </ProfButton>
            </ButtonsWrapper>
          </Content>
        </ContentWrapper>
        <Sample />
      </LeftWrapper>
      {state.isDesktop && (
        <RightWrapper>
          <SignUp />
        </RightWrapper>
      )}
      {state.open && (
        <AboutDialog
          isOpen={state.open}
          handleClose={onCloseButton}
          state={aboutState}
          onCategory={(title: string) => dispatchAbout({ title: title })}
        />
      )}
    </LogoutHomeWrapper>
  );
};
