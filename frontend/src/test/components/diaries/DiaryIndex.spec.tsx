import React from 'react';
import { render , screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DiaryIndex } from '../../../components/diaries';
import { dateToday } from '../../../helpers';

afterEach(cleanup);

const date =  dateToday();
const testTContent:string = 'A123456789B123456789C123456789D123456789E123456789F123456789';
const diaries = [
  {
    id: 1,
    date: date,
    content: 'Test Content',
    picture_url: null,
    user_id: 1,
  },
  {
    id: 2,
    date: date,
    content: testTContent,
    picture_url: '/testurl',
    user_id: 1,
  },
];

describe('DiaryIndex コンポーネント', () => {
  beforeEach(() => {
    render(
      <DiaryIndex
        diaries={diaries}
        onOpenDiaryDialog={jest.fn()}
      />
    )
  })

  it('プロパティで受け取るデータを元に表示', () => {
    diaries.forEach((obj, index) => {
      // 配列の要素数だけ表示
      const diary = screen.getByTestId(`diary-${index}`);
      expect(diary).toBeTruthy();

      // 配列要素のdateプロパティを表示
      const diaryDate = screen.getByTestId(`diaryDate-${index}`);
      expect(diaryDate).toHaveTextContent(obj.date)

      // 配列要素のcontentプロパティを表示 50文字を超える場合は超えた文字を省略
      const diaryContent = screen.getByTestId(`diaryContent-${index}`);
      expect(diaryContent).toHaveTextContent(obj.content.length <= 50 ? obj.content : `${obj.content.slice(0, 50)}......`)
    })
  })
});