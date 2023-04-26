import { FC, Fragment } from "react";
import styled from "styled-components";

// components
import { AnimatedSection } from "./AnimatedSection";
import { CustomGallery } from "./CustomGallery";
// images
import BackImage from "../images/sample.jpg";
import diaryPicture from "../images/sample/diary.png";
import diaryCreatePicture from "../images/sample/diarycreate.png";
import Gallery1Picture from "../images/sample/gallery1.png";

const SampleWrapper = styled.div`
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
  color: limegreen;
  @media screen and (max-width: 480px) {
    margin-top: 15vh;
  }
`;

const Contents = styled.span`
  width: 55vw;
  float: right;
  font-size: 1.2rem;
  @media screen and (max-width: 979px) {
    width: 100vw;
  }
`;

const ContentTitle = styled.h2`
  margin-left: 7.5vw;
  color: limegreen;
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

const items = [
  { original: diaryPicture },
  { original: diaryCreatePicture },
  { original: Gallery1Picture },
];
export const Sample: FC = () => {
  return (
    <SampleWrapper data-testid="sample">
      <Title>Sample</Title>
      <Contents>
        <ContentTitle data-testid="titleDiary">Diary</ContentTitle>
        <AnimatedSection>
          <Fragment>
            <OverView data-testid="overViewDiary">
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
          <ContentTitle data-testid="titlePhotoGallery">
            PhotGallery
          </ContentTitle>
        </AnimatedSection>
        <AnimatedSection>
          <OverView data-testid="overViewPhotoGallery">
            日記に添付された画像をスライドショーとして閲覧することができます。
          </OverView>
        </AnimatedSection>
        <AnimatedSection>
          <CustomGallery items={items} />
        </AnimatedSection>
      </Contents>
    </SampleWrapper>
  );
};
