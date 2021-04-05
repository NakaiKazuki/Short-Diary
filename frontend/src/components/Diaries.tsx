import React, { VFC } from 'react';
import styled from 'styled-components';

// css
const DiariesWrapper = styled.ul`
padding-inline-start: 0;
  @media screen and (min-width:480px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const DiaryItemWrapper = styled.li`
  margin-top: .5rem;
  list-style: none;
  height: 20vh;
  width: 17%;
  border: .0125rem solid royalblue;
  position: relative;
  @media screen and (min-width:481px) {
    margin-left: 1rem;
  }
  @media screen and (min-width: 768px) and (max-width: 979px) {
    width: 44%;
  }
  @media screen and (max-width:480px) {
    width: 100%;
  }
  :hover{
    cursor: pointer;
  }
`;

const DiaryDate = styled.p`
  font-family: cursive, Century;
  font-style: italic;
  color: darkorange;
  padding:  0 1rem;
`;

const DiaryContent = styled.div`
  white-space: pre-line;
  word-wrap: break-word;
  padding:  0 1rem;
`;

const DiaryImageMessage = styled.div`
  font-size: .8rem;
  position: absolute;
  bottom: 0;
  padding:  0 1rem;
`;

// 型
interface IDiary {
  date: string;
  content: string;
  picture_url: string | null;
  user_id: number;
}

interface DiariesProps {
  diaries: Array<IDiary>,
}

export const Diaries: VFC<DiariesProps> = ({
  diaries
}) => {
  return(
    <DiariesWrapper>
      {
        diaries.map((obj: IDiary, index: number) => {
        return(
          <DiaryItemWrapper key={`diary-${index}`}>
            <DiaryDate>{obj.date}</DiaryDate>
            <DiaryContent>
              {
                obj.content.length <= 50 ?
                  obj.content
                :
                `${obj.content.slice(0, 50)}...`
              }
            </DiaryContent>
            {
              obj.picture_url &&
              <DiaryImageMessage>画像があります</DiaryImageMessage>
            }
          </DiaryItemWrapper>
        )
        })
      }
    </DiariesWrapper>
  );
}