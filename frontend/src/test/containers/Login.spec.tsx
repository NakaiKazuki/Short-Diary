import "@testing-library/jest-dom";
import { render, cleanup, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { authAtom } from "../../atoms/Auth";
import { Login } from "../../containers/Login";
import { signIn } from "../../urls";
import { el } from "../helpers";

// types
import { TLinks } from "../../types/test";

afterEach(cleanup);

const mockAxios = new MockAdapter(axios);
const result = {
  data: {
    data: {
      id: 1,
      name: "testName",
      email: "test@example.com",
    },
  },
  headers: {
    "access-token": "testtoken",
    client: "testclient",
    uid: "test@example.com",
  },
};

const errorResult = {
  errors: ["ResultError"],
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

const idNames = ["email", "password"];

const linkInfo: TLinks = [
  {
    url: "/signup",
    text: "アカウントが無い方はこちら",
  },
  {
    url: "/resetPassword",
    text: "パスワードを忘れた方はこちら",
  },
];

const customRender = (ui: JSX.Element) => {
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
        set(authAtom, undefined);
      }}
    >
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

describe("Loginコンポーネント", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });

  const setup = () => customRender(<Login />);

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
          expect(el(`${idNames[0]}ResultError`)).toBeTruthy();
        });
        await waitFor(() => {
          expect(el(`${idNames[1]}ResultError`)).toBeTruthy();
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
