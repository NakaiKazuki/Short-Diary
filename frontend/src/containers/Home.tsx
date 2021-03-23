import React, { VFC, Fragment, useState ,useEffect } from 'react';
import styled from 'styled-components';
// import { Link } from "react-router-dom";

// images
import HomeBackGround from '../images/homebackground.jpg';

// components
import { Header } from '../components/Header';
import { SignupDialog } from '../components/SignUpDialog'
import { LoginDialog } from '../components/LoginDialog'
import { BaseButton } from '../components/shared_style';

// apis
import { fetchHome } from '../apis/home'

// css
const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${HomeBackGround});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size:cover;
`;

const ContentsWrapper = styled.div`
  padding: 10% 10% 0 20%;
  display: inline-block;
`;

const HeadingWrapper = styled.h1`
  position: relative;
  padding: 0.5em;
  background: limegreen;
  color: white;
  &:before {
    position: absolute;
    content: '';
    top: 100%;
    left: 0;
    border: none;
    border-bottom: solid 1rem transparent;
    border-right: solid 1.3rem rgb(149, 158, 155);
  }
`;

const ParagraphWrapper = styled.p`
  margin: 10% 0 0 5%;
  padding: 5%;
  line-height: 1.7;
  border-left :solid 0.3rem royalblue;
`;

const ButtonsWrapper = styled.span`
  margin: 10% 0 0 10%;
  display: flex;
  justify-content: space-evenly;
`;

// 新規登録 ゲストボタン共通スタイル
const HomeButton = styled(BaseButton)`
  height: 4vh;
  width: 10rem;
  border-style: none;
  border-radius: 3%;
  letter-spacing:0.2rem;
  color: white;
`;

const SignUpButtonWrapper = styled(HomeButton)`
  background-color: royalblue;
`;

const LoginButtonWrapper = styled(HomeButton)`
  background-color: limegreen;
`;

// 型
interface InitialStateProps {
  isOpenSignUpDialog: boolean;
  isOpenLoginDialog: boolean;
  signUpName: string;
  signUpEmail: string;
  signUpPassword: string;
  signUpPasswordConfirmation: string;
  loginEmail: string;
  loginPassword: string;
}

export const Home:VFC = () => {
  useEffect(() => {
    fetchHome()
    .then((data) =>
      console.log(data)
    )
  }, [])

  const initialState: InitialStateProps = {
    isOpenSignUpDialog: false,
    isOpenLoginDialog: false,
    signUpName: "valueテスト",
    signUpEmail: "email",
    signUpPassword: "password",
    signUpPasswordConfirmation: "password",
    loginEmail: "",
    loginPassword: "",
  }

  const [state, setState] = useState(initialState);

  // Headerにあるログインボタンクリックでモーダルを開く
  const loginDialogOpenHandler = ():void => {
    setState({
      ...state,
      isOpenLoginDialog: true,
    })
  };

  // 新規ユーザーの登録情報をApiへ送信
  const submitSignUpHandler = ():void => {
    console.log('登録ボタンが押された！');
  };

  // ユーザーのログイン情報をApiへ送信
  const submitLoginHandler = ():void => {
    console.log('ログインボタンが押された！');
  };

  return(
    <Fragment>
      <Header
        loginDialogOpenHandler={() => loginDialogOpenHandler()}
      />
      <HomeWrapper data-testid="homeContainer">
        <ContentsWrapper>
          <HeadingWrapper>
            毎日の出来事を記録しよう
          </HeadingWrapper>
          <ParagraphWrapper>
            日記を付けたいけど、文章を書くのは面倒だと思ったことはありませんか？<br />
            Short Diaryでは日々の日記を一言二言の内容で書くことで、<br />
            メモ感覚で日記をつけることができます。<br />
            Short Diaryを使って日記を付けよう！
          </ParagraphWrapper>
          <ButtonsWrapper>
            <SignUpButtonWrapper
              type="button"
              data-testid="signUpButton"
              onClick={() => setState({
                ...state,
                isOpenSignUpDialog: true,
              })}
            >
              ユーザー登録
            </SignUpButtonWrapper>
            <LoginButtonWrapper type="submit" data-testid="guestLoginButton">
              ゲストログイン
            </LoginButtonWrapper>
          </ButtonsWrapper>
        </ContentsWrapper>
      </HomeWrapper>
      {
        state.isOpenSignUpDialog &&
          <SignupDialog
            isOpen={state.isOpenSignUpDialog}
            name={state.signUpName}
            email={state.signUpEmail}
            password={state.signUpPassword}
            passwordConfirmation={state.signUpPasswordConfirmation}
            onClickSignUp = {() => submitSignUpHandler()}
            onClose={() => setState({
              ...state,
              isOpenSignUpDialog: false,
            })}
          />
      }
      {
        state.isOpenLoginDialog &&
          <LoginDialog
            isOpen={state.isOpenLoginDialog}
            email={state.loginEmail}
            password={state.loginPassword}
            onClickLogin = {() => submitLoginHandler()}
            onClose={() => setState({
              ...state,
              isOpenLoginDialog: false,
            })}
          />
      }
    </Fragment>
  )
}