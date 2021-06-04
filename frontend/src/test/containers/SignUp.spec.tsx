import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { createMemoryHistory } from "history";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { SignUp } from "../../containers/SignUp";
import { registration } from "../../urls";
import { signUpLinkInfo as linkInfo } from "../../formInfo";

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

const customRender = (
  ui: JSX.Element,
  { providerProps }: { providerProps: IProviderProps }
) => {
  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <CurrentUserContext.Provider {...providerProps}>
        {ui}
      </CurrentUserContext.Provider>
    </Router>
  );
};

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
const returnErrorData = {
  data: {
    errors: {
      name: ["name ApiError"],
      email: ["email ApiError"],
      password: ["password ApiError"],
      password_confirmation: ["password_confirmation ApiError"],
    },
  },
};

const providerProps = {
  value: {
    currentUser: undefined,
    setCurrentUser: jest.fn(),
  },
};

const el = screen.getByTestId;
const mockAxios = new MockAdapter(axios);

afterEach(cleanup);

describe("SignUpコンポーネント", () => {
  beforeEach(() => {
    customRender(<SignUp />, { providerProps });
  });

  describe("Form欄", () => {
    it("Formがある", () => {
      expect(el("signUpForm")).toBeTruthy();
    });

    describe("Form入力欄", () => {
      const idNames = ["name", "email", "password", "password_confirmation"];

      it("各入力欄のブロックがある", () => {
        idNames.forEach((idName) =>
          expect(el("signUpForm")).toContainElement(el(`FormItem-${idName}`))
        );
      });

      it("エラーメッセージ", async () => {
        // ApiResponse
        mockAxios.onPost(registration).reply(200);

        // 各項目に無効な値を入力
        formInfo.forEach((obj) => userEvent.clear(el(obj.testId)));

        // ユーザが送信ボタンをクリック
        userEvent.click(el("formSubmit"));

        // 各項目に対応したエラーメッセージが表示
        await waitFor(() => {
          idNames.forEach((idName) =>
            expect(el(`${idName}ErrorMessage`)).toBeTruthy()
          );
        });
      });

      it("Apiエラーメッセージ", () => {
        // ApiResponse
        mockAxios.onPost(registration).reply(401, returnErrorData);

        // 各項目に値を入力
        formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));

        // ユーザが送信ボタンをクリック
        userEvent.click(el("formSubmit"));

        // 各項目に対応したApiからのエラーメッセージが表示
        idNames.forEach(async (idName) =>
          expect(await screen.findByTestId(`${idName}ApiError`)).toBeTruthy()
        );
      });
    });

    describe("送信ボタン", () => {
      it("送信ボタンがある", () => {
        expect(el("formSubmit")).toHaveAttribute("type", "submit");
      });

      it("送信状況に応じてボタンの要素が変化 Status200", async () => {
        // ApiResponse
        mockAxios.onPost(registration).reply(200);

        // 各項目に有効な値を入力
        formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("SignUp!");
        expect(el("formSubmit")).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        userEvent.click(el("formSubmit"));

        // 送信完了
        await waitFor(() => {
          expect(el("formSubmit")).toHaveTextContent("送信完了!");
          expect(el("formSubmit")).toBeDisabled();
        });
      });

      it("送信状況に応じてボタンの要素が変化 Status401", async () => {
        // ApiResponse
        mockAxios.onPost(registration).reply(401, returnErrorData);

        // 各項目に有効な値を入力
        formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("SignUp!");
        expect(el("formSubmit")).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        userEvent.click(el("formSubmit"));

        // APIからエラーが返ってくると初期値に戻る
        await waitFor(() => {
          expect(el("formSubmit")).toHaveTextContent("SignUp!");
          expect(el("formSubmit")).not.toBeDisabled();
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
