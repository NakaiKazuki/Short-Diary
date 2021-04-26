import React from 'react';
import { render , screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DiaryMenu } from '../../../components/diaries/DiaryMenu';


const el = screen.getByTestId;
afterEach(cleanup);

describe('DiaryMenu コンポーネント', () => {

  describe('共通',() => {
    beforeEach(() => {
      render(
        <DiaryMenu
          anchorEl={null}
          isOpenDiaryEdit={false}
          onMenuOpen={jest.fn()}
          onMenuClose={jest.fn()}
          onOpenCofirmationDialog={jest.fn()}
          onDiaryEditMode={jest.fn()}
          onDiaryShowMode={jest.fn()}
        />
      )
    })

    it('MenuIconがある', () => {
      expect(el('menuIcon')).toBeTruthy();
    })

    it('メニューは基本非表示',() => {

      expect(el('diaryMenuBar')).toHaveStyle('visibility: hidden');
    })

    // 閲覧・編集時どちらにも表示される項目
    it('削除', () => {
      expect(el('diaryMenuBar')).toContainElement(el('MenuItemDiaryDelete'));
      // IconとTextで表示
      expect(el('MenuItemDiaryDelete')).toContainElement(el('deleteIcon'));
      expect(el('MenuItemDiaryDelete')).toHaveTextContent('削除')
    })
  })


  describe('メニュー項目(閲覧モード)', () => {
    beforeEach(() => {
      render(
        <DiaryMenu
          anchorEl={null}
          isOpenDiaryEdit={false}
          onMenuOpen={jest.fn()}
          onMenuClose={jest.fn()}
          onOpenCofirmationDialog={jest.fn()}
          onDiaryEditMode={jest.fn()}
          onDiaryShowMode={jest.fn()}
        />
      )
    })

    it('編集', () => {
      expect(el('diaryMenuBar')).toContainElement(el('MenuItemDiaryEdit'));
      // IconとTextで表示
      expect(el('MenuItemDiaryEdit')).toContainElement(el('editIcon'));
      expect(el('MenuItemDiaryEdit')).toHaveTextContent('編集')
    })
  })

  describe('メニュー項目(編集モード)', () => {
    beforeEach(() => {
      render(
        <DiaryMenu
          anchorEl={null}
          isOpenDiaryEdit={true}
          onMenuOpen={jest.fn()}
          onMenuClose={jest.fn()}
          onOpenCofirmationDialog={jest.fn()}
          onDiaryEditMode={jest.fn()}
          onDiaryShowMode={jest.fn()}
        />
      )
    })

    it('閲覧', () => {
      // 閲覧モードに変更項目
      expect(el('diaryMenuBar')).toContainElement(el('MenuItemDiaryShow'));
      // IconとTextで表示
      expect(el('MenuItemDiaryShow')).toContainElement(el('visibilityIcon'));
      expect(el('MenuItemDiaryShow')).toHaveTextContent('閲覧')
    })
  })
});