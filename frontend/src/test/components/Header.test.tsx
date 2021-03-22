import React from "react";
import { Router } from "react-router-dom";
import { render ,cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { Header } from '../../components/Header';

afterEach(cleanup);

// Helper function
const renderWithRouter = (component: any) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

describe("Header component", () => {
  test("Headerが表示されている", () => {
    const { container, getByTestId } = renderWithRouter(<Header />);

    const header = getByTestId("header");
    expect(container).toContainElement(header);
  });

  test("ホーム画面へのリンクがある", () => {
    const { container, getByTestId } = renderWithRouter(<Header />);

    const HomeLink = getByTestId("homeLink");
    expect(container).toContainElement(HomeLink);
  })

  test("ログインボタンがある", () => {
    const { container, getByTestId } = renderWithRouter(<Header />);

    const loginButton = getByTestId("loginButton");
    expect(container).toContainElement(loginButton);
  })
});