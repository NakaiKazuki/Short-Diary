import { FC, Fragment } from "react";
import ImageGallery from "react-image-gallery";
import styled from "styled-components";

// components
import { AnimatedSection } from "./AnimatedSection";

// images
import BackImage from "../images/about.jpg";
import diaryPicture from "../images/sample/diary.png";
import diaryCreatePicture from "../images/sample/diarycreate.png";
import Gallery1Picture from "../images/sample/gallery1.png";

const AboutWrapper = styled.div`
  overflow: hidden;
  background-image: url(${BackImage});
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
  overflow: hidden;
  margin-bottom: 10vh;
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

const items = [
  { original: diaryPicture, originalHeight: 768, originalWidth: 768 },
  { original: diaryCreatePicture, originalHeight: 768, originalWidth: 768 },
  { original: Gallery1Picture, originalHeight: 768, originalWidth: 768 },
];
export const About: FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <Title>About</Title>
      <Contents>
        <ContentTitle>Diary</ContentTitle>
        <AnimatedSection>
          <Fragment>
            <OverView>
              日記を作成する際、日付・内容以外にもタグの作成や画像の添付を行うことができます。
              <br />
              またYoutubeの動画リンクを記載することで日記の詳細画面で動画の再生が可能です。
            </OverView>
            <ImgWrapper>
              <Img src={diaryCreatePicture} />
              <Img src={diaryPicture} />
            </ImgWrapper>
          </Fragment>
        </AnimatedSection>
        <AnimatedSection>
          <ContentTitle>PhotGallery</ContentTitle>
        </AnimatedSection>
        <AnimatedSection>
          <OverView>
            日記に添付された画像をスライドショーとして閲覧することができます。
          </OverView>
        </AnimatedSection>
        <AnimatedSection>
          <CustomGallery data-testid="imageGallery">
            <ImageGallery
              items={items}
              showNav={true}
              disableKeyDown={false}
              showFullscreenButton={false}
            />
          </CustomGallery>
        </AnimatedSection>
      </Contents>
    </AboutWrapper>
  );
};
