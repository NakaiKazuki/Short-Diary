import "@testing-library/jest-dom";
import { render, cleanup, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { authAtom, messageAtom } from "../../atoms";
import { SignUp } from "../../containers/SignUp";
import { registration } from "../../urls";
import { el } from "../helpers";

// types
import { TLinks } from "../../types/test";

afterEach(cleanup);

// 正しいForm情報
const formInfo = [
  {
    testId: "nameArea",
    value: "testName",
  },
  {
    testId: "emailArea",
    value: "test@example.com",
  },
  {
    testId: "passwordArea",
    value: "testPassword",
  },
  {
    testId: "password_confirmationArea",
    value: "testPassword",
  },
];

const linkInfo: TLinks = [
  {
    url: "/login",
    text: "登録済みの方はこちら",
  },
];

const errorResult = {
  errors: {
    name: ["name ResultError"],
    email: ["email ResultError"],
    password: ["password ResultError"],
    password_confirmation: ["password_confirmation ResultError"],
  },
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
        set(messageAtom, undefined);
        set(authAtom, undefined);
      }}
    >
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

const idNames = ["name", "email", "password", "password_confirmation"];

const mockAxios = new MockAdapter(axios);

describe("SignUpコンポーネント", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });

  const setup = () => customRender(<SignUp />);

  beforeEach(() => setup());

  describe("Form欄", () => {
    it("Formがある", () => {
      expect(el("signUpForm")).toBeTruthy();
    });

    describe("Form入力欄", () => {
      it("各入力欄のブロックがある", () => {
        idNames.forEach((idName) =>
          expect(el("signUpForm")).toContainElement(el(`FormItem-${idName}`))
        );
      });

      it("エラーメッセージ", async () => {
        // ApiResponse
        mockAxios.onPost(registration).reply(200, {});

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
        mockAxios.onPost(registration).reply(401, errorResult);

        // 各項目に値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));
        // 各項目に対応したApiからのエラーメッセージが表示
        await waitFor(() => {
          expect(el(`${idNames[0]}ResultError`)).toBeTruthy();
        });
        await waitFor(() => {
          expect(el(`${idNames[1]}ResultError`)).toBeTruthy();
        });
        await waitFor(() => {
          expect(el(`${idNames[2]}ResultError`)).toBeTruthy();
        });
        await waitFor(() => {
          expect(el(`${idNames[3]}ResultError`)).toBeTruthy();
        });
      });
    });

    describe("送信ボタン", () => {
      it("送信ボタンがある", () => {
        expect(el("formSubmit")).toHaveAttribute("type", "submit");
      });

      // なんかcatchのほうにいってるんやけど？
      it("送信結果に応じてボタンの要素が変化 Status200", async () => {
        // ApiResponse
        mockAxios.onPost(registration).reply(200, { status: 200 });

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("Sign Up!");
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
        mockAxios.onPost(registration).reply(422, errorResult);

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("Sign Up!");
        expect(el("formSubmit")).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // APIからエラーが返ってくると初期値に戻る
        await waitFor(() => {
          expect(el("formSubmit")).toHaveTextContent("Sign Up!");
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
