import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { AuthContext } from "../../contexts/Auth";
import { Login } from "../../containers/Login";
import { signIn } from "../../urls";
import { loginLinkInfo as linkInfo } from "../../formInfo";

interface ICurrentUser {
  id: number;
  name: string;
  email: string;
}

interface IProviderProps {
  value: {
    currentUser: ICurrentUser | undefined;
    setCurrentUser: jest.Mock<React.Dispatch<React.SetStateAction<undefined>>>;
  };
}

const mockAxios = new MockAdapter(axios);
const result = {
  data: {
    id: 1,
    name: "testName",
    email: "test@example.com",
  },
  headers: {
    "access-token": "testtoken",
    client: "testclient",
    uid: "test@example.com",
  },
};

const errorResult = {
  errors: ["ApiError"],
};

// 正しいForm情報
const formInfo = [
  {
    testId: "emailArea",
    value: "test@example.com",
  },
  {
    testId: "passwordArea",
    value: "testPassword",
  },
];

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

const idNames = ["email", "password"];

const el = screen.getByTestId;

afterEach(cleanup);

describe("Loginコンポーネント", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });
  const setup = () => customRender(<Login />, providerProps);
  beforeEach(() => setup());
  describe("Form欄", () => {
    it("Formがある", () => {
      expect(el("loginForm")).toBeTruthy();
    });

    describe("Form入力欄", () => {
      it("Form内に各入力欄がある", () => {
        idNames.forEach((idName) =>
          expect(el("loginForm")).toContainElement(el(`FormItem-${idName}`))
        );
      });

      it("エラーメッセージ", async () => {
        // ApiResponse
        mockAxios.onPost(signIn).reply(200, result.data, result.headers);

        // 各項目に無効な値を入力
        formInfo.forEach(async (obj) => await userEvent.clear(el(obj.testId)));

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // 各項目に対応したエラーメッセージが表示
        await waitFor(() => {
          idNames.forEach((idName) =>
            expect(el(`${idName}ErrorMessage`)).toBeTruthy()
          );
        });
      });

      it("Apiエラーメッセージ", async () => {
        // ApiResponse
        mockAxios.onPost(signIn).reply(401, errorResult);

        // 各項目に値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // 各項目に対応したApiエラーメッセージが表示
        await waitFor(() => {
          expect(el(`${idNames[0]}ApiError`)).toBeTruthy();
        });
        await waitFor(() => {
          expect(el(`${idNames[1]}ApiError`)).toBeTruthy();
        });
      });
    });

    describe("送信ボタン", () => {
      it("送信ボタンがある", () => {
        expect(el("formSubmit")).toHaveAttribute("type", "submit");
      });

      it("送信結果に応じてボタンの要素が変化 Status200", async () => {
        // ApiResponse
        mockAxios.onPost(signIn).reply(200, result.data, result.headers);

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("Login!");

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));
        // 送信完了
        await waitFor(() =>
          expect(el("formSubmit")).toHaveTextContent("送信完了!")
        );
      });

      it("送信結果に応じてボタンの要素が変化 Status401", async () => {
        // ApiResponse
        mockAxios.onPost(signIn).reply(401, errorResult);

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("Login!");
        expect(el("formSubmit")).not.toBeDisabled();

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // APIからエラーが返ってくると初期値に戻る
        await waitFor(() =>
          expect(el("formSubmit")).toHaveTextContent("Login!")
        );
      });
    });
  });

  it("Links", () => {
    linkInfo.forEach((obj, index) => {
      expect(el(`formLink-${index}`)).toHaveAttribute(`href`, obj.url);
      expect(el(`formLink-${index}`)).toHaveTextContent(obj.text);
    });
  });
});
