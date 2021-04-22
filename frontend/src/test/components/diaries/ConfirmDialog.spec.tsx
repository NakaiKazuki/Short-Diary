import React from 'react';
import { render , screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfirmDialog } from '../../../components/diaries';
import { dateToday } from '../../../helpers';
afterEach(cleanup);

const diary = {
  id: 1,
  date: dateToday(),
  content: 'Test Content',
  picture_url: null,
  user_id: 1,
};

describe('ConfirmDialog コンポーネント', () => {
  beforeEach(() => {
    render(
      <ConfirmDialog
        isOpen={true}
        title={'Test Title'}
        contentText={'Test Content'}
        diary={diary}
        onDiaryDelete={jest.fn()}
        onClose={jest.fn()}
      />
    )
  })

  describe('要素の表示確認',() => {
    it('DialogTitle', () => {
      const title = screen.getByTestId('confirmDialogTitle');

      // プロパティによって内容が変わる
      expect(title).toHaveTextContent('Test Title');
    })

    it('DialogContentText', () => {
      const content = screen.getByTestId('confirmDialogContent');

      // プロパティによって内容が変わる
      expect(content).toHaveTextContent('Test Content');
    })

    it('DialogCloseButton', () => {
      const closeButton = screen.getByTestId('confirmDialogCloseButton');

      expect(closeButton ).toHaveAttribute('type','button')
      expect(closeButton ).toHaveTextContent('閉じる')
    })

    it('DiaryDeleteButton', () => {
      const deleteButton = screen.getByTestId('diaryDleteButton');

      expect(deleteButton).toHaveAttribute('type','button')
      expect(deleteButton).toHaveTextContent('削除')
    })
  })
});