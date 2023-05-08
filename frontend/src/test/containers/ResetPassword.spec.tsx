import "@testing-library/jest-dom";
import { render, cleanup, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { authAtom } from "../../atoms/Auth";
import { messageAtom } from "../../atoms/Message";
import { ResetPassword } from "../../containers/ResetPassword";
import { password } from "../../urls";
import { el } from "../helpers";

// types
import { TLinks } from "../../types/test";

afterEach(cleanup);

const mockAxios = new MockAdapter(axios);
// 正しいForm情報
const formInfo = [
  {
    testId: "emailArea",
    value: "test@example.com",
  },
];

const idNames = ["email"];

const linkInfo: TLinks = [
  {
    url: "/signup",
    text: "アカウントが無い方はこちら",
  },
  {
    url: "/login",
    text: "ログイン可能な方はこちら",
  },
];

const errorResult = {
  errors: ["email ResultError"],
};

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
        set(messageAtom, undefined);
      }}
    >
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

describe("ResetPasswordコンポーネント", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });
  const setup = () => customRender(<ResetPassword />);
  beforeEach(() => setup());
  describe("Form欄", () => {
    it("Formがある", () => {
      expect(el("resetPasswordForm")).toBeTruthy();
    });

    describe("Form入力欄", () => {
      it("各入力欄のブロックがある", () => {
        idNames.forEach((idName) =>
          expect(el("resetPasswordForm")).toContainElement(
            el(`FormItem-${idName}`)
          )
        );
      });

      it("エラーメッセージ", async () => {
        // ApiResponse
        mockAxios.onPost(password).reply(200, {});

        // 各項目に無効な値を入力
        formInfo.forEach((obj) => userEvent.clear(el(obj.testId)));

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
        mockAxios.onPost(password).reply(404, errorResult);

        // 各項目に値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));
        // 各項目に対応したApiからのエラーメッセージが表示
        await waitFor(() => {
          expect(el(`${idNames[0]}ResultError`)).toBeTruthy();
        });
      });
    });

    describe("送信ボタン", () => {
      it("送信ボタンがある", () => {
        expect(el("formSubmit")).toHaveAttribute("type", "submit");
      });

      it("送信結果に応じてボタンの要素が変化 Status200", async () => {
        // ApiResponse
        mockAxios.onPost(password).reply(200, { status: 200 });

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("Password Reset!");
        expect(el("formSubmit")).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // 送信完了
        await waitFor(() => {
          expect(el("formSubmit")).toHaveTextContent("送信完了!");
        });
      });

      it("送信結果に応じてボタンの要素が変化 Status422", async () => {
        // ApiResponse
        mockAxios.onPost(password).reply(404, errorResult);

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("Password Reset!");
        expect(el("formSubmit")).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // APIからエラーが返ってくると初期値に戻る
        await waitFor(() => {
          expect(el("formSubmit")).toHaveTextContent("Password Reset!");
        });
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
