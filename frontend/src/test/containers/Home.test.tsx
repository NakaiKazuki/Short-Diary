import React from "react";
import { render , screen, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Home } from '../../containers/Home';


const renderWithRouter = (component: any) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

beforeEach( async () => {
  renderWithRouter(<Home />);
})

afterEach(cleanup);

describe('Homeコンポーネント',  () => {
  test('ユーザー登録ボタンがある', () => {
    const signUpButton = screen.getByTestId("signUpButton");

    expect(signUpButton).toHaveAttribute('type', 'button')
  });

  test('ゲストログインボタンがある', () => {
    const guestLoginButton = screen.getByTestId("guestLoginButton");

    expect(guestLoginButton).toHaveAttribute('type', 'submit')
  });

  test('ユーザー登録ボタンクリックで新規登録モーダルを表示', () => {
    userEvent.click(screen.getByTestId("signUpButton"));
    const signUpDialog = screen.getByTestId("signUpDialog");

    expect(signUpDialog).toBeTruthy();
  })

  test('ログインボタンクリックでログインモーダルを表示', () => {
    userEvent.click(screen.getByTestId("loginButton"));
    const loginDialog = screen.getByTestId("loginDialog");

    expect(loginDialog).toBeTruthy();
  })
});