import "@testing-library/jest-dom";
import { render, cleanup, waitFor, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthContext } from "../../contexts/Auth";
import { LogoutHome } from "../../containers/LogoutHome";
import { guestSignIn } from "../../urls";
import { el } from "../helpers";

// types
import { IAuthProviderProps as IProviderProps } from "../../types/test";

afterEach(cleanup);

// IntersectionObserverのモックを作成
class IntersectionObserver {
  observe() {
    return null;
  }

  unobserve() {
    return null;
  }

  disconnect() {
    return null;
  }
}

// テスト実行前にwindowオブジェクトにIntersectionObserverを追加する
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});
const mockAxios = new MockAdapter(axios);

mockAxios.onPost(guestSignIn).reply(
  200,
  {
    id: 1,
    name: "test",
    email: "test@example.com",
  },
  {
    "access-token": "testtoken",
    client: "testclient",
    uid: "test@example.com",
  }
);

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
        <HelmetProvider>
          <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>
        </HelmetProvider>
      ),
    },
  ];
  const router = createMemoryRouter(routes);
  return render(<RouterProvider router={router} />);
};

describe("LogoutHome", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });
  const setup = () => customRender(<LogoutHome />, providerProps);
  beforeEach(() => setup());

  it("要素の確認(スマートフォン以外の場合)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1024,
    });
    expect(el("leftWrapper")).toBeTruthy();
    expect(el("sample")).toBeTruthy();
    expect(el("signUpForm")).toBeTruthy();
  });

  it("要素の確認(スマートフォンの場合)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 320,
    });
    expect(el("leftWrapper")).toBeTruthy();
    expect(el("sample")).toBeTruthy();
    expect(screen.queryByTestId("menuBar")).toBeFalsy();
  });

  it("PhotGalleryがある", () => {
    expect(el("imageGallery")).toBeTruthy();
  });

  it("ユーザ登録画面へのリンクがある", () => {
    expect(el("signUpLink")).toHaveAttribute("href", "/signup");
  });

  it("技術・プロフィール表示用ボタンがある", () => {
    expect(el("aboutButton")).toBeTruthy();
  });

  describe("ゲストログインボタン", () => {
    it("ゲストログインボタン", () => {
      expect(el("guestLoginButton")).toHaveAttribute("type", "button");
    });

    it("ボタンの要素が変化", async () => {
      // 初期値
      expect(el("guestLoginButton")).toHaveTextContent("ゲストログイン");
      expect(el("guestLoginButton")).not.toBeDisabled();

      // ユーザがゲストログインボタンをクリック
      await userEvent.click(el("guestLoginButton"));

      // 送信完了
      await waitFor(() =>
        expect(el("guestLoginButton")).toHaveTextContent("送信完了!")
      );
      await waitFor(() => expect(el("guestLoginButton")).toBeDisabled());
    });
  });

  it("AboutDialogコンポーネント", async () => {
    await userEvent.click(el("aboutButton"));
    expect(el("aboutDialog")).toBeTruthy();
  });
});
