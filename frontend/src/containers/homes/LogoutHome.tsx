import React, {
  VFC,
  useContext,
  useReducer} from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import styled from 'styled-components';

//contexts
import { CurrentUserContext } from '../../contexts/CurrentUser';

// apis
import { newGuestSession } from '../../apis/users/sessions';


// helpers
import {
  onSubmitLabel,
  isDisabled
} from '../../helpers';

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from '../../reducers/submit';

// components
import { BaseButton } from '../../components/shared_style';

// images
import HomeBackGround from '../../images/homebackground.jpg';

// css
const LogoutHomeWrapper = styled.div`
  width: 100vw;
  height: 90vh;
  margin-top: 6.6vh;
  background-image: url(${HomeBackGround});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size:cover;
`;

const Contents = styled.div`
  margin-top: 15vh;
  display: inline-block;
  @media screen and (min-width: 481px) {
    margin-left: 10vw;
  };
`;

const Heading = styled.h1`
  position: relative;
  padding: .5rem;
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

const Paragraph = styled.p`
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
  letter-spacing: .2rem;
  color: white;
  font-size: 0.95rem;
`;

const SignUpButton = styled(HomeButton)`
  background-color: royalblue;
`;

const GuestLogin = styled(HomeButton)`
  background-color: limegreen;
`;


export const LogoutHome: VFC = () => {
  const { currentUser ,setCurrentUser } = useContext(CurrentUserContext);
  const [ state, dispatch ] = useReducer(submitReducer, initialState);
  const history = useHistory();

  const onGuestLoginButton = (): void => {
    dispatch({ type: submitActionTypes.POSTING});
    newGuestSession()
    .then(res => {
      dispatch({ type: submitActionTypes.POST_SUCCESS });
      setCurrentUser({
        ...currentUser,
        ...res.data,
        headers: res.headers,
      })
      history.push("/")
    })
    .catch(e => {
      throw e;
    });
  };

  return(
    <LogoutHomeWrapper data-testid="homeContainer">
      <Contents>
        <Heading>
          毎日の出来事を記録しよう
        </Heading>
        <Paragraph>
          日記を付けたいけど、文章を書くのは面倒だと思ったことはありませんか？<br />
          Short Diaryでは日々の日記を一言二言の内容で書くことで、<br />
          メモ感覚で日記をつけることができます。<br />
          Short Diaryを使って日記を付けよう！
        </Paragraph>
        <ButtonsWrapper>
          <Link
            to={'/signup'}
            data-testid="signUpLink"
          >
            <SignUpButton
              type="button"
              data-testid="signUpButton"
            >
              ユーザー登録
            </SignUpButton>
          </Link>
          <GuestLogin
            type="button"
            onClick ={onGuestLoginButton}
            disabled={isDisabled(state.postState)}
            data-testid="guestLoginButton">
            {onSubmitLabel(state.postState, "ゲストログイン")}
          </GuestLogin>
        </ButtonsWrapper>
      </Contents>
    </LogoutHomeWrapper>
  );
}