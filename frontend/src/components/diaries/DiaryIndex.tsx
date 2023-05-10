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

const variants = {
  hover: {
    scale: 1.06,
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

const Diary = styled(motion.li).attrs<typeof variants>(() => ({
  variants: variants,
  whileHover: "hover",
  whileTap: "tap",
  initial: "rest",
  animate: "rest",
}))`
  margin: 0.5rem auto 0 auto;
  list-style: none;
  height: 22vh;
  width: 98%;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20rem;
  background-color: white;
  border: 2px solid #d5d6da;
  box-shadow: 2px 2px 4px #b7b8b9;
  :hover {
    cursor: pointer;
    z-index: 1;
    border: 2px solid limegreen;
    box-shadow: none;
  }
`;

const Paragraph = styled.p`
  padding: 0 1rem;
`;

const Date = styled.span`
  font-family: Comic Sans MS;
  font-style: italic;
  font-size: 1.6rem;
  color: limegreen;
  margin: 0 auto;
  opacity: 0.9;
  font-weight: bold;
`;

const ImageIconArea = styled(PictureIcon)`
  float: right;
  color: limegreen;
`;

const MovieIconArea = styled(MovieIcon)`
  float: right;
  color: red;
`;

const Content = styled.div`
  white-space: pre-line;
  overflow-wrap: break-word;
  width: 96%;
  margin: 0 auto;
  font-size: 1.3rem;
  opacity: 0.9;
  color: #333;
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
