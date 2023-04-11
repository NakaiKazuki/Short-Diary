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
const DiariesWrapper = styled.ul`
  margin-top: 1.5rem;
  padding-inline-start: 0;
  @media screen and (min-width: 481px) {
    display: flex;
    flex-wrap: wrap;
  }
  @media screen and (max-width: 480px) {
    margin-top: 5rem;
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

const DiaryWrapper = styled(motion.li).attrs<typeof buttonVariants>(() => ({
  variants: buttonVariants,
  whileHover: "hover",
  whileTap: "tap",
  initial: "rest",
  animate: "rest",
}))`
  margin-top: 0.5rem;
  list-style: none;
  height: 22vh;
  width: 18%;
  border: 0.0125rem solid limegreen;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (min-width: 481px) {
    margin-left: 1rem;
  }
  @media screen and (min-width: 768px) and (max-width: 979px) {
    width: 44%;
  }
  @media screen and (max-width: 480px) {
    height: 10rem;
    width: 100%;
  }
  :hover {
    cursor: pointer;
    z-index: 1;
    background-color: white;
    border: 0.12rem solid limegreen;
  }
`;

const Paragraph = styled.p`
  padding: 0 1rem;
`;

const Date = styled.span`
  font-family: cursive, Century;
  font-style: italic;
  text-align: center;
  color: mediumblue;
`;

const ImageIconArea = styled(PictureIcon)`
  float: right;
  color: royalblue;
`;

const MovieIconArea = styled(MovieIcon)`
  float: right;
  color: royalblue;
`;

const Content = styled.div`
  white-space: pre-line;
  overflow-wrap: break-word;
  padding: 0 1rem;
`;

export const DiaryIndex: FC<IProps> = ({
  diaries,
  formattedDate,
  onOpenDiaryDialog,
}) => {
  return (
    <DiariesWrapper data-testid="diaryIndex">
      {diaries.map((diary: IDiary, index: number): JSX.Element => {
        return (
          <DiaryWrapper
            key={`diary-${index}`}
            onClick={() => onOpenDiaryDialog(diary)}
            data-testid={`diary-${index}`}
          >
            <Paragraph>
              <Date data-testid={`diaryDate-${index}`}>
                {formattedDate(diary.date)}
              </Date>
              {diary.picture_url && <ImageIconArea />}
              {diary.movie_source && <MovieIconArea />}
            </Paragraph>
            <Content data-testid={`diaryContent-${index}`}>
              {diary.content.length <= 40
                ? diary.content
                : `${diary.content.slice(0, 40)}......`}
            </Content>
          </DiaryWrapper>
        );
      })}
    </DiariesWrapper>
  );
};
