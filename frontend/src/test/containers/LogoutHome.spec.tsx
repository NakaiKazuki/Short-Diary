import React from "react";
import "@testing-library/jest-dom";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { LogoutHome } from "../../containers/LogoutHome";
import { guestSignIn } from "../../urls";

interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface ICurrentUser {
  id: number;
  name: string;
  email: string;
}

interface IProviderProps {
  value: {
    currentUser: ICurrentUser | undefined;
    headers: IHeaders | undefined;
    setCurrentUser: jest.Mock<React.Dispatch<React.SetStateAction<undefined>>>;
    setHeaders: jest.Mock<React.Dispatch<React.SetStateAction<undefined>>>;
  };
}

const el = screen.getByTestId;
const mockAxios = new MockAdapter(axios);

mockAxios.onPost(guestSignIn).reply(200, {
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
});

const providerProps = {
  value: {
    headers: undefined,
    currentUser: undefined,
    setCurrentUser: jest.fn(),
    setHeaders: jest.fn(),
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

afterEach(cleanup);

describe("LogoutHome", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });
  const setup = () => customRender(<LogoutHome />, providerProps);
  beforeEach(() => setup());

  it("左右の要素確認", () => {
    expect(el("leftHome")).toBeTruthy();
    expect(el("rightHome")).toBeTruthy();
  });

  it("PhotGalleryがある", () => {
    expect(el("imageGallery")).toBeTruthy();
  });

  it("ユーザ登録画面へのリンクがある", () => {
    expect(el("signUpLink")).toHaveAttribute("href", "/signup");
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
});
