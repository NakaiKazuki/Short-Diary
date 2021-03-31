import React from "react";
import { Router } from "react-router-dom";
import { render , screen, cleanup} from "@testing-library/react";
import { createMemoryHistory } from "history";
import '@testing-library/jest-dom';
import { Header } from '../../components/Header';

// Helper function
const renderWithRouter = (component: any) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

beforeEach(() => {
  const handleSignOut = jest.fn();
  renderWithRouter(<Header isSignedIn={true} handleSignOut={() => handleSignOut} />);
})

afterEach(cleanup);

describe("Header コンポーネント", () => {
  test("ホーム画面へのリンク", () => {
    const HomeLink = screen.getByTestId("homeLink");

    expect(HomeLink ).toBeTruthy();
  })

  test("ログインボタン", () => {
    const loginButton = screen.getByTestId("loginButton");

    expect(loginButton).toHaveAttribute('type', 'button')
  })
});