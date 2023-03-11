import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { AuthContext } from "../../contexts/Auth";
import { Header } from "../../containers/Header";

// types
import { IAuthProviderProps as IProviderProps } from "../../types/test";

const el = screen.getByTestId;
afterEach(cleanup);

const currentUser = {
  id: 1,
  name: "test",
  email: "test@example.com",
};

const providerProps = {
  value: {
    currentUser: undefined,
    setCurrentUser: jest.fn(),
  },
};

const customRender = (ui: JSX.Element, providerProps: IProviderProps) => {
  const routes = [
    {
      path: "/",
      element: (
        <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>
      ),
    },
  ];
  const router = createMemoryRouter(routes);
  return render(<RouterProvider router={router} />);
};

describe("Header コンポーネント", () => {
  describe("ログアウト時", () => {
    const setup = () => customRender(<Header />, providerProps);
    beforeEach(() => {
      setup();
    });
    it("ホーム画面へのリンク", () => {
      expect(el("homeLink")).toBeTruthy();
    });

    it("ログインページへのリンク", () => {
      expect(el("loginLink")).toHaveAttribute("href", "/login");
    });

    it("新規登録ページへのリンク", () => {
      expect(el("signUpLink")).toHaveAttribute("href", "/signup");
    });
  });

  describe("ログイン時", () => {
    const providerProps = {
      value: {
        currentUser: currentUser,
        setCurrentUser: jest.fn(),
      },
    };

    const setup = () => customRender(<Header />, providerProps);
    beforeEach(() => setup());

    it("MenuIcon", () => {
      expect(el("menuIcon")).toBeTruthy();
    });

    it("ホーム画面へのリンク", () => {
      expect(el("homeLink")).toHaveAttribute("href", "/");
    });

    it("ユーザアイコンが表示", () => {
      expect(el("userIcon")).toBeTruthy();
    });

    describe("MenuBar表示", () => {
      it("MenuBarの表示", async () => {
        // デフォルトは非表示
        expect(screen.queryByTestId("menuBar")).toBeNull();
        // ユーザがクリックすることで表示
        await userEvent.click(el("userIcon"));
        expect(el("menuBar")).toHaveStyle("visibility: visible");
      });

      it("ユーザ情報編集リンク", async () => {
        // ユーザ情報編集リンク
        await userEvent.click(el("userIcon"));
        expect(el("menuBar")).toContainElement(el("userEditLink"));
      });

      it("Logoutボタン", async () => {
        await userEvent.click(el("userIcon"));
        expect(el("menuBar")).toContainElement(el("logoutButton"));
      });
    });
  });
});
