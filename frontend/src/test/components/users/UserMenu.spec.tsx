import React from 'react';
import { render , screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserMenu } from '../../../components/users';

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
    const userIcon = screen.getByTestId('userIcon');
    expect(userIcon).toBeTruthy();
  })

  it('メニューは基本非表示',() => {
    const menuBar = screen.getByTestId('menuBar');

    expect(menuBar).toHaveStyle('visibility: hidden');
  })

  it('メニュー項目', () => {
    const menuBar = screen.getByTestId('menuBar');

    // ログアウトボタン
    const logoutButton = screen.getByTestId('logoutButton');
    expect(menuBar).toContainElement(logoutButton);
  })
});