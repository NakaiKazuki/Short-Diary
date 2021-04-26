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

const el = screen.getByTestId;

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
      // プロパティによって内容が変わる
      expect(el('confirmDialogTitle')).toHaveTextContent('Test Title');
    })

    it('DialogContentText', () => {
      // プロパティによって内容が変わる
      expect(el('confirmDialogContent')).toHaveTextContent('Test Content');
    })

    it('DialogCloseButton', () => {
      expect(el('confirmDialogCloseButton')).toHaveAttribute('type','button')
      expect(el('confirmDialogCloseButton')).toHaveTextContent('閉じる')
    })

    it('deleteButton', () => {
      expect(el('deleteButton')).toHaveAttribute('type','button')
      expect(el('deleteButton')).toHaveTextContent('削除')
    })
  })
});