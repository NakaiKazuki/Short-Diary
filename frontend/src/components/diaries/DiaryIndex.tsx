import { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
// components
import { PictureIcon, MovieIcon } from "../icon";

// types
import {
  IDiariesProps as IProps,
  IDiary,
} from "../../types/components/diaries";

// css
const Container = styled.span`
  height: 100%;
`;

const Diaries = styled.ul`
  margin: 0 auto;
  padding-inline-start: 0;
  width: 100%;
  @media screen and (min-width: 481px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const buttonVariants = {
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
} as const;

const DiaryWrapper = styled.span`
  width: 25%;
  @media screen and (min-width: 980px) and (max-width: 1300px) {
    width: 33%;
  }
  @media screen and (max-width: 979px) {
    width: 100%;
  }
`;

const Diary = styled(motion.li).attrs<typeof buttonVariants>(() => ({
  variants: buttonVariants,
  whileHover: "hover",
  whileTap: "tap",
  initial: "rest",
  animate: "rest",
}))`
  margin: 0.5rem auto 0 auto;
  list-style: none;
  height: 22vh;
  width: 98%;
  border: 0.0125rem solid limegreen;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20rem;
  background-color: white;
  :hover {
    cursor: pointer;
    z-index: 1;
    background-color: #eeeeee;
    border: 0.12rem solid limegreen;
  }
  @media screen and (min-width: 980px) and (max-width: 1300px) {
    height: 20rem;
  }
  @media screen and (max-width: 979px) {
    height: 10rem;
  }
`;

const Paragraph = styled.p`
  padding: 0 1rem;
`;

const Date = styled.span`
  font-family: cursive, Century;
  font-style: italic;
  text-align: center;
  font-size: 1.7rem;
  color: limegreen;
`;

const ImageIconArea = styled(PictureIcon)`
  float: right;
  color: royalblue;
`;

const MovieIconArea = styled(MovieIcon)`
  float: right;
  color: red;
`;

const Content = styled.div`
  white-space: pre-line;
  overflow-wrap: break-word;
  padding: 0 1rem;
  font-size: 1.2rem;
`;

export const DiaryIndex: FC<IProps> = ({
  diaries,
  formattedDate,
  onOpenDiaryDialog,
}) => {
  return (
    <Container>
      <Diaries data-testid="diaryIndex">
        {diaries.map((diary: IDiary, index: number): JSX.Element => {
          return (
            <DiaryWrapper key={`diary-${index}`}>
              <Diary
                onClick={() => onOpenDiaryDialog(diary)}
                data-testid={`diary-${index}`}
              >
                <Paragraph>
                  <Date data-testid={`diaryDate-${index}`}>
                    {formattedDate(diary.date)}
                  </Date>
                  {diary.picture_url && <ImageIconArea fontSize="large" />}
                  {diary.movie_source && <MovieIconArea fontSize="large" />}
                </Paragraph>
                <Content data-testid={`diaryContent-${index}`}>
                  {diary.content.length <= 40
                    ? diary.content
                    : `${diary.content.slice(0, 40)}......`}
                </Content>
              </Diary>
            </DiaryWrapper>
          );
        })}
      </Diaries>
    </Container>
  );
};
