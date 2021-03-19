import React, { Fragment, VFC } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
// import { Link } from "react-router-dom";

// images
import HomeBackGround from '../images/homebackground.jpg';

// components
import { Header } from '../components/Header';

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
  background: deepskyblue;
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

export  const Homes:VFC = () => {
  return(
    <Fragment>
      <Header />
      <HomeWrapper>
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
            <Button size="large" variant="contained" color="primary">
              新規登録
            </Button>
            <Button size="large" variant="outlined" color="primary">
              ゲストログイン
            </Button>
          </ButtonsWrapper>
        </ContentsWrapper>
      </HomeWrapper>
    </Fragment>
  )
}