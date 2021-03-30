import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// components
import { BaseButton } from '../shared_style';

// images
import HomeBackGround from '../../images/homebackground.jpg';

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
  margin-top: 15vh;
  display: inline-block;
  @media screen and (min-width: 481px) {
    margin-left: 10vw;
  };
`;

const HeadingWrapper = styled.h1`
  position: relative;
  padding: 0.5rem;
  background: royalblue;
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
  margin-top: 10%;
  display: flex;
  justify-content: space-evenly;
`;

// 新規登録 ゲストボタン共通スタイル
const HomeButton = styled(BaseButton)`
  height: 2.5rem;
  width: 10rem;
  border-style: none;
  letter-spacing:0.2rem;
  color: white;
  font-size: 0.95rem;
`;

const SignUpButtonWrapper = styled(HomeButton)`
  background-color: royalblue;
`;

const GuestLoginWrapper = styled(HomeButton)`
  background-color: limegreen;
`;

interface LogoutHomeProps {
  handleGuestLogin(): void;
  submitLabel(): string;
  isDisabled(): boolean;
}

export const LogoutHome: VFC<LogoutHomeProps> = ({
  isDisabled,
  handleGuestLogin,
  submitLabel,
}) => {
  return(
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
        <Link
          to={'/signup'}
          data-testid="signUpLink"
        >
          <SignUpButtonWrapper
            type="button"
            data-testid="signUpButton"
          >
            ユーザー登録
          </SignUpButtonWrapper>
        </Link>
        <GuestLoginWrapper
          type="button"
          onClick={() => handleGuestLogin()}
          disabled={isDisabled()}
          data-testid="guestLoginButton">
          {submitLabel()}
        </GuestLoginWrapper>
      </ButtonsWrapper>
    </ContentsWrapper>
  </HomeWrapper>
  );
}