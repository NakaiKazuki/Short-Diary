import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { authAtom } from "../../atoms";
import { Header } from "../../containers/Header";
import { el } from "../helpers";

afterEach(cleanup);

const currentUser = {
  id: 1,
  name: "test",
  email: "test@example.com",
};

const customRender = (
  ui: JSX.Element,
  currentUser: ICurrentUser | undefined
) => {
  const routes = [
    {
      path: "/",
      element: ui,
    },
  ];
  const router = createMemoryRouter(routes);
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(authAtom, currentUser);
      }}
    >
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

describe("Header コンポーネント", () => {
  describe("ログアウト時", () => {
    const setup = () => customRender(<Header />, undefined);
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
    const setup = () => customRender(<Header />, currentUser);
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
