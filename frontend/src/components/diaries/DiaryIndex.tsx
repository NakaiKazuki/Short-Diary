import React, { VFC } from 'react';
import styled from 'styled-components';

// components
import { PictureIcon } from '../Icons';

// css
const DiariesWrapper = styled.ul`
padding-inline-start: 0;
  @media screen and (min-width:480px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const DiaryWrapper = styled.li`
  margin-top: .5rem;
  list-style: none;
  height: 17vh;
  width: 18%;
  border: .0125rem solid limegreen;
  border-radius: .5rem;
  position: relative;
  @media screen and (min-width:481px) {
    margin-left: 1rem;
  }
  @media screen and (min-width: 768px) and (max-width: 979px) {
    width: 44%;
  }
  @media screen and (max-width:480px) {
    height: 10rem;
    width: 100%;
  }
  :hover{
    background-color:#EEEEEE;
    cursor: pointer;
  }
`;

const Paragraph = styled.p`
  padding:  0 1rem;
`;

const DiaryDate = styled.span`
  font-family: cursive, Century;
  font-style: italic;
  text-align: center;
  color: mediumblue;
`;

const ImageIconArea = styled(PictureIcon)`
  float: right;
  color: royalblue;
`;

const DiaryContent = styled.div`
  white-space: pre-line;
  word-wrap: break-word;
  padding:  0 1rem;
`;

// 型
interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string | null;
  user_id: number;
}

interface DiariesProps {
  diaries: Array<IDiary>;
  onOpenDiaryDialog(diary: IDiary): void;
}

export const DiaryIndex: VFC<DiariesProps> = ({
  diaries,
  onOpenDiaryDialog,
}) => {
  return(
    <DiariesWrapper>
      {
        diaries.map((diary: IDiary, index: number) => {
        return(
          <DiaryWrapper
            key={`diary-${index}`}
            onClick={() => onOpenDiaryDialog(diary)}
          >
            <Paragraph>
              <DiaryDate>{diary.date}</DiaryDate>
              {
                diary.picture_url &&
                <ImageIconArea />
              }
            </Paragraph>
            <DiaryContent>
              {
                diary.content.length <= 50 ?
                  diary.content
                :
                `${diary.content.slice(0, 50)}......`
              }
            </DiaryContent>
          </DiaryWrapper>
        )
        })
      }
    </DiariesWrapper>
  );
}