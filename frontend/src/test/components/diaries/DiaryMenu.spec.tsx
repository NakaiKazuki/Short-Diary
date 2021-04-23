import React from 'react';
import { render , screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DiaryMenu } from '../../../components/diaries/DiaryMenu';

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
      const menuIcon = screen.getByTestId('menuIcon');
      expect(menuIcon).toBeTruthy();
    })

    it('メニューは基本非表示',() => {
      const diaryMenuBar = screen.getByTestId('diaryMenuBar');

      expect(diaryMenuBar).toHaveStyle('visibility: hidden');
    })

    // 閲覧・編集時どちらにも表示される項目
    it('削除', () => {
      const diaryMenuBar = screen.getByTestId('diaryMenuBar');
      const MenuItemDiaryDelete = screen.getByTestId('MenuItemDiaryDelete');
      expect(diaryMenuBar).toContainElement(MenuItemDiaryDelete);
      // IconとTextで表示
      const deleteIcon = screen.getByTestId('deleteIcon');
      expect(MenuItemDiaryDelete).toContainElement(deleteIcon);
      expect(MenuItemDiaryDelete).toHaveTextContent('削除')
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
      const diaryMenuBar = screen.getByTestId('diaryMenuBar');

      const MenuItemDiaryEdit = screen.getByTestId('MenuItemDiaryEdit');
      expect(diaryMenuBar).toContainElement(MenuItemDiaryEdit);
      // IconとTextで表示
      const editIcon = screen.getByTestId('editIcon');
      expect(MenuItemDiaryEdit).toContainElement(editIcon);
      expect(MenuItemDiaryEdit).toHaveTextContent('編集')
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
      const diaryMenuBar = screen.getByTestId('diaryMenuBar');

      // 閲覧モードに変更項目
      const MenuItemDiaryShow = screen.getByTestId('MenuItemDiaryShow');
      expect(diaryMenuBar).toContainElement(MenuItemDiaryShow);
      // IconとTextで表示
      const visibilityIcon = screen.getByTestId('visibilityIcon');
      expect(MenuItemDiaryShow).toContainElement(visibilityIcon);
      expect(MenuItemDiaryShow).toHaveTextContent('閲覧')
    })
  })
});