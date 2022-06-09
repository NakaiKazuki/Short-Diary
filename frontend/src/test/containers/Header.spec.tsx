import React from "react";
import { Router } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";
import { AuthContext } from "../../contexts/Auth";
import { Header } from "../../containers/Header";

interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface IData {
  id: number;
  name: string;
  email: string;
}

interface ICurrentUser {
  data: IData;
  headers: IHeaders;
}

interface IProviderProps {
  value: {
    currentUser: ICurrentUser | undefined;
    setCurrentUser: jest.Mock<React.Dispatch<React.SetStateAction<undefined>>>;
  };
}

const currentUser = {
  headers: {
    "access-token": "testtoken",
    client: "testclient",
    uid: "test@example.com",
  },
  data: {
    id: 1,
    name: "test",
    email: "test@example.com",
  },
};

const providerProps = {
  value: {
    currentUser: undefined,
    setCurrentUser: jest.fn(),
  },
};

const customRender = (ui: JSX.Element, providerProps: IProviderProps) => {
  const history = createMemoryHistory();
  return render(
    <Router location={history.location} navigator={history}>
      <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>
    </Router>
  );
};

const el = screen.getByTestId;

afterEach(cleanup);

describe("Header コンポーネント", () => {
  describe("ログアウト時", () => {
    const setup = () => customRender(<Header />, providerProps);
    // eslint-disable-next-line testing-library/no-render-in-setup
    beforeEach(() => setup());
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
    // eslint-disable-next-line testing-library/no-render-in-setup
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
