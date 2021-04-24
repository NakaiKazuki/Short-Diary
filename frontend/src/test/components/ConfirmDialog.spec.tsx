import { render , screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { dateToday } from '../../helpers';

const diary = {
  id: 1,
  date: dateToday(),
  content: 'Test Content',
  picture_url: null,
  user_id: 1,
};

afterEach(cleanup);

describe('ConfirmDialog コンポーネント', () => {
  beforeEach(() => {
    render(
      <ConfirmDialog
        isOpen={true}
        title={'Test Title'}
        contentText={'Test Content'}
        obj={diary}
        onDelete={jest.fn()}
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

    it('deleteButton', () => {
      const deleteButton = screen.getByTestId('deleteButton');

      expect(deleteButton).toHaveAttribute('type','button')
      expect(deleteButton).toHaveTextContent('削除')
    })
  })
});