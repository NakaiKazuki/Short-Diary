import { FC } from "react";
import styled from "styled-components";

// components
import { PictureIcon } from "../icons";

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

const DiaryWrapper = styled.li`
  margin-top: 0.5rem;
  list-style: none;
  height: 22vh;
  width: 18%;
  border: 0.0125rem solid limegreen;
  border-radius: 0.5rem;
  position: relative;
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
    background-color: #eeeeee;
    cursor: pointer;
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

const Content = styled.div`
  white-space: pre-line;
  overflow-wrap: break-word;
  padding: 0 1rem;
`;

// 型
interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string | null;
  tag_list: Array<string | null>;
  user_id: number;
}
interface DiariesProps {
  diaries: Array<IDiary>;
  onOpenDiaryDialog(diary: IDiary): void;
}

export const DiaryIndex: FC<DiariesProps> = ({
  diaries,
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
              <Date data-testid={`diaryDate-${index}`}>{diary.date}</Date>
              {diary.picture_url && (
                <ImageIconArea data-testid={`diaryimageIcon-${index}`} />
              )}
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
