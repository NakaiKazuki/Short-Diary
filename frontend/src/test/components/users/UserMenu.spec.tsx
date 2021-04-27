import React from 'react';
import { render , screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserMenu } from '../../../components/users';

const el = screen.getByTestId;

afterEach(cleanup);

describe('UserMenu コンポーネント', () => {
  beforeEach(() => {
    render(
      <UserMenu
        anchorEl={null}
        onMenuOpen={jest.fn()}
        onMenuClose={jest.fn()}
        onSignOut={jest.fn()}
      />
    )
  })

  it('UserIconがある', () => {
    const userIcon = el('userIcon');
    expect(userIcon).toBeTruthy();
  })

  it('メニューは基本非表示',() => {
    const menuBar = el('menuBar');

    expect(menuBar).toHaveStyle('visibility: hidden');
  })

  it('メニュー項目', () => {
    const menuBar = el('menuBar');

    // ログアウトボタン
    const logoutButton = el('logoutButton');
    expect(menuBar).toContainElement(logoutButton);
  })
});