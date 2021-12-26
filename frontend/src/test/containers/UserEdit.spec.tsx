import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { createMemoryHistory } from "history";
import { AuthContext } from "../../contexts/Auth";
import { UserEdit } from "../../containers/UserEdit";
import { registration } from "../../urls";
import { UserEditLinkInfo as linkInfo } from "../../formInfo";

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

// ユーザデータ
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

const mockAxios = new MockAdapter(axios);
const returnData = {
  headers: {
    "access-token": "testtoken",
    client: "testclient",
    uid: "test@example.com",
  },
  data: {
    id: 1,
    name: "testName",
    email: "test@example.com",
  },
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
  {
    testId: "current_passwordArea",
    value: "testPassword",
  },
];

const returnErrorData = {
  data: {
    errors: {
      guest: ["guest ApiError"],
      name: ["name ApiError"],
      email: ["email ApiError"],
      password: ["password ApiError"],
      password_confirmation: ["password_confirmation ApiError"],
      current_password: ["current_password ApiError"],
    },
  },
};

const idNames = [
  "name",
  "email",
  "password",
  "password_confirmation",
  "current_password",
];

const guestIdNames = ["guest"];

const providerProps = {
  value: {
    currentUser: currentUser,
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

describe("UserEditコンポーネント", () => {
  const setup = () => customRender(<UserEdit />, providerProps);

  describe("Form欄", () => {
    it("Formがある", () => {
      setup();
      expect(el("userEditForm")).toBeTruthy();
    });

    describe("Form入力欄", () => {
      it("Form内に各入力欄がある", () => {
        setup();
        idNames.forEach((idName) =>
          expect(el("userEditForm")).toContainElement(el(`FormItem-${idName}`))
        );
      });

      it("エラーメッセージ", async () => {
        setup();
        // ApiResponse
        mockAxios.onPut(registration).reply(200, returnData);

        // 各項目に無効な値を入力
        formInfo.forEach((obj) => userEvent.clear(el(obj.testId)));

        // ユーザが送信ボタンをクリック
        userEvent.click(el("formSubmit"));

        // 各項目に対応したエラーメッセージが表示
        await waitFor(() =>
          expect(el(`current_passwordErrorMessage`)).toBeTruthy()
        );
      });

      it("Apiエラーメッセージ", () => {
        setup();
        // ApiResponse
        mockAxios.onPut(registration).reply(422, returnErrorData);

        // 各項目に値を入力
        formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));

        // ユーザが送信ボタンをクリック
        userEvent.click(el("formSubmit"));

        idNames.forEach(async (idName) => {
          expect(await screen.findByTestId(`${idName}ApiError`)).toBeTruthy();
        });
      });

      it("ゲストユーザ専用エラーメッセージ", async () => {
        setup();
        mockAxios.onPut(registration).reply(422, returnErrorData);

        // 各項目に値を入力
        formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));

        // ユーザが送信ボタンをクリック
        userEvent.click(el("formSubmit"));

        // ゲストエラーの項目にメッセージが表示
        guestIdNames.forEach(async (guestIdName) => {
          expect(
            await screen.findByTestId(`${guestIdName}ApiError`)
          ).toBeTruthy();
        });
      });
    });

    describe("送信ボタン", () => {
      it("送信ボタンがある", () => {
        setup();
        expect(el("formSubmit")).toHaveAttribute("type", "submit");
      });

      it("送信状況に応じてボタンの要素が変化 Status200", async () => {
        setup();
        // ApiResponse
        mockAxios.onPut(registration).reply(200, returnData);

        // 各項目に有効な値を入力
        formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("Profile Edit!");
        expect(el("formSubmit")).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        userEvent.click(el("formSubmit"));

        // 送信完了
        await waitFor(() =>
          expect(el("formSubmit")).toHaveTextContent("送信完了!")
        );
      });

      it("送信状況に応じてボタンの要素が変化 Status401", async () => {
        setup();
        // ApiResponse
        mockAxios.onPut(registration).reply(401, returnErrorData);

        // 各項目に有効な値を入力
        formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("Profile Edit!");
        expect(el("formSubmit")).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        userEvent.click(el("formSubmit"));

        // APIからエラーが返ってくると初期値に戻る
        await waitFor(() =>
          expect(el("formSubmit")).toHaveTextContent("Profile Edit!")
        );
      });
    });
  });

  it("Links", () => {
    linkInfo.forEach((obj, index) => {
      setup();
      expect(el(`formLink-${index}`)).toHaveAttribute(`href`, obj.url);
      expect(el(`formLink-${index}`)).toHaveTextContent(obj.text);
    });
  });
});
