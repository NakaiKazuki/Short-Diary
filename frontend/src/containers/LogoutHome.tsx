import { FC, useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Flip from "react-reveal/Flip";
import Roll from "react-reveal/Roll";
import ImageGallery from "react-image-gallery";
import Cookies from "js-cookie";
import styled from "styled-components";
//contexts
import { AuthContext } from "../contexts/Auth";

// apis
import { newGuestSession } from "../apis/users/sessions";

// helpers
import { onSubmitText, isDisabled } from "../helpers";

// reducers
import {
  initialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// components
import { BaseButton } from "../components/shared_style";

// images
import LeftHome from "../images/lefthome.jpg";
import RightHome from "../images/righthome.jpg";
import diaryPicture from "../images/sample/diary.png";
import diaryCreatePicture from "../images/sample/diarycreate.png";
import Gallery1Picture from "../images/sample/gallery1.png";

// css
const LogoutHomeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`;

const LeftWrapper = styled.div`
  min-height: 93vh;
  background-image: url(${LeftHome});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  @media screen and (min-width: 980px) {
    position: sticky;
    position: -webkit-sticky; /*Safari用*/
    position: sticky;
    flex: 0.45;
    max-height: 93vh;
    top: 0;
  }
  @media screen and (max-width: 979px) {
    width: 100vw;
  }
  @media screen and (max-width: 480px) {
    height: 84vh;
  }
`;

const Content = styled.div`
  margin-top: 21vh;
  display: inline-block;
  @media screen and (min-width: 481px) {
    margin-left: 10vw;
  }
  @media screen and (max-width: 480px) {
    margin-top: 15vh;
  }
`;

const Heading = styled.h1`
  position: relative;
  padding: 0.5rem;
  background: royalblue;
  color: white;
  &:before {
    position: absolute;
    content: "";
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
  border-left: solid 0.3rem royalblue;
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
  letter-spacing: 0.2rem;
  color: white;
  font-size: 0.95rem;
`;

const SignUpButton = styled(HomeButton)`
  background-color: royalblue;
`;

const GuestLogin = styled(HomeButton)`
  background-color: limegreen;
`;

const RightWrapper = styled.div`
  margin-bottom: 7vh;
  overflow: hidden;
  background-image: url(${RightHome});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  @media screen and (min-width: 980px) {
    flex: 0.55;
  }
  @media screen and (max-width: 979px) {
    width: 100vw;
  }
`;

const Title = styled.h1`
  margin-top: 21vh;
  text-align: center;
  @media screen and (max-width: 480px) {
    margin-top: 15vh;
  }
`;

const Contents = styled.span`
  width: 55vw;
  float: right;
  @media screen and (max-width: 979px) {
    width: 100vw;
  }
`;

const ContentTitle = styled.h2`
  margin-left: 7.5vw;
`;
const OverView = styled.p`
  margin-left: 10vw;
`;
const ImgWrapper = styled.div`
  margin-top: 0.2vh 0 0 10vw;
`;

const Img = styled.img`
  margin: 2vh 0 0 10vw;
  width: 70%;
  height: auto;
`;

const CustomGallery = styled.div`
  margin-top: 3vh;
  overflow: hidden;
  @media screen and (max-width: 480px) {
    margin-top: 0;
  }
  .image-gallery {
    position: relative;
  }
  .image-gallery-slides {
    height: 60vh;
    white-space: nowrap;
  }
  .image-gallery-slide,
  .image-gallery-image {
    width: 100%;
    object-fit: contain;
    align-items: center;
    @media screen and (max-width: 480px) {
      height: 50vh;
    }
  }
  .image-gallery-slide {
    position: absolute;
    text-align: center;
    .right {
      visibility: hidden;
    }
  }
  .image-gallery-slide-wrapper:hover .image-gallery-right-nav {
    opacity: 1;
  }
  .image-gallery-slide-wrapper:hover .image-gallery-left-nav {
    opacity: 1;
  }
  .image-gallery-slide-wrapper:hover .image-gallery-play-button {
    opacity: 1;
  }
  .image-gallery-left-nav,
  .image-gallery-right-nav,
  .image-gallery-play-button {
    cursor: pointer;
  }
  .image-gallery-left-nav,
  .image-gallery-right-nav {
    position: absolute;
    background-color: transparent;
    border: none;
    top: 42%;
    border: none;
    width: 6%;
    height: 13.5%;
    opacity: 0;
    z-index: 1;
    @media screen and (min-width: 768px) and (max-width: 979px) {
      width: 15%;
      height: 13.5%;
      top: 37%;
    }
    @media screen and (max-width: 480px) {
      width: 20%;
      height: 13.5%;
      top: 19%;
    }
  }
  .image-gallery-right-nav {
    right: 10%;
    @media screen and (max-width: 979px) {
      right: 0;
    }
  }
  .image-gallery-left-nav {
    left: 10%;
    @media screen and (max-width: 979px) {
      left: 0;
    }
  }
  .image-gallery-play-button {
    z-index: 1;
    position: absolute;
    background-color: transparent;
    border: none;
    top: -2%;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 7%;
    height: 13.5%;
    opacity: 0;
    :hover {
      opacity: 1;
    }
    @media screen and (min-width: 768px) and (max-width: 979px) {
      width: 15%;
      height: 13.5%;
      top: 0;
    }
    @media screen and (max-width: 480px) {
      width: 20%;
      height: 13.5%;
      top: -37%;
    }
  }
`;
export const LogoutHome: FC = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const [submitState, dispatch] = useReducer(submitReducer, initialState);
  const navigate = useNavigate();

  const items = [
    { original: diaryPicture, originalHeight: 768, originalWidth: 768 },
    { original: diaryCreatePicture, originalHeight: 768, originalWidth: 768 },
    { original: Gallery1Picture, originalHeight: 768, originalWidth: 768 },
  ];

  const onGuestLoginButton = async (): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });
    await newGuestSession()
      .then((res) => {
        dispatch({ type: submitActionTypes.POST_SUCCESS });
        Cookies.set("client", res.headers["client"]);
        Cookies.set("uid", res.headers["uid"]);
        Cookies.set("access-token", res.headers["access-token"]);
        setCurrentUser(res.data);
        navigate("/");
      })
      .catch((e) => {
        Cookies.remove("uid");
        Cookies.remove("client");
        Cookies.remove("access-token");
        setCurrentUser(undefined);
        throw e;
      });
  };

  return (
    <LogoutHomeWrapper>
      <LeftWrapper data-testid="leftHome">
        <Content>
          <Heading>毎日の出来事を記録しよう</Heading>
          <Paragraph>
            日記を付けたいけど、文章を書くのは面倒だと思ったことはありませんか？
            <br />
            Short Diaryでは日々の日記を一言二言の内容で書くことで、
            <br />
            メモ感覚で日記をつけることができます。
            <br />
            Short Diaryを使って日記を付けよう!
          </Paragraph>
          <ButtonsWrapper>
            <Link to="/signup" data-testid="signUpLink">
              <SignUpButton type="button">ユーザー登録</SignUpButton>
            </Link>
            <GuestLogin
              type="button"
              onClick={onGuestLoginButton}
              disabled={isDisabled(submitState.postState)}
              data-testid="guestLoginButton"
            >
              {onSubmitText(submitState.postState, "ゲストログイン")}
            </GuestLogin>
          </ButtonsWrapper>
        </Content>
      </LeftWrapper>
      <RightWrapper data-testid="rightHome">
        <Flip right cascade>
          <Title>Sample</Title>
        </Flip>
        <Contents>
          <ContentTitle>Diary</ContentTitle>
          <OverView>
            日記を作成する際、日付・内容以外にもタグの作成や画像の添付を行うことができます。
            <br />
            またYoutubeの動画リンクを記載することで日記の詳細画面で動画の再生が可能です。
          </OverView>
          <ImgWrapper>
            <Roll right>
              <Img src={diaryCreatePicture} />
            </Roll>
            <Roll right>
              <Img src={diaryPicture} />
            </Roll>
          </ImgWrapper>
          <ContentTitle>PhotGallery</ContentTitle>
          <OverView>
            日記に添付された画像をスライドショーとして閲覧することができます。
          </OverView>
          <Roll right>
            <CustomGallery data-testid="imageGallery">
              <ImageGallery
                items={items}
                showNav={true}
                disableKeyDown={false}
                showFullscreenButton={false}
              />
            </CustomGallery>
          </Roll>
        </Contents>
      </RightWrapper>
    </LogoutHomeWrapper>
  );
};
