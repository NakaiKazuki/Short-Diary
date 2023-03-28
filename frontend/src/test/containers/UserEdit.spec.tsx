import { render, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { MessageContext } from "../../contexts/Message";
import { UserEdit } from "../../containers/UserEdit";
import { registration } from "../../urls";
import { UserEditLinkInfo as linkInfo } from "../../formInfo";
import { el } from "../helpers";

// types
import { IAuthProviderProps as IProviderProps } from "../../types/test";

afterEach(cleanup);

// ユーザデータ
const currentUser = {
  id: 1,
  name: "test",
  email: "test@example.com",
};

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

// 正しいForm情報
const formInfo = [
  {
    testId: "nameArea",
    value: "",
  },
  {
    testId: "emailArea",
    value: "",
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

const errorResult = {
  errors: {
    guest: ["guest ApiError"],
    name: ["name ApiError"],
    email: ["email ApiError"],
    password: ["password ApiError"],
    password_confirmation: ["password_confirmation ApiError"],
    current_password: ["current_password ApiError"],
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

const messageProps = {
  value: {
    message: undefined,
    setMessage: jest.fn(),
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
  return render(
    <MessageContext.Provider {...messageProps}>
      <RouterProvider router={router} />
    </MessageContext.Provider>
  );
};

describe("UserEditコンポーネント", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });
  const setup = () => customRender(<UserEdit />, providerProps);
  beforeEach(() => setup());

  describe("Form欄", () => {
    it("Formがある", () => {
      expect(el("userEditForm")).toBeTruthy();
    });

    describe("Form入力欄", () => {
      it("Form内に各入力欄がある", () => {
        idNames.forEach((idName) =>
          expect(el("userEditForm")).toContainElement(el(`FormItem-${idName}`))
        );
      });

      it("エラーメッセージ", async () => {
        // ApiResponse
        mockAxios.onPut(registration).reply(200, result.data, result.headers);

        // 各項目に無効な値を入力
        formInfo.forEach((obj) => userEvent.clear(el(obj.testId)));

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // 各項目に対応したエラーメッセージが表示
        await waitFor(() => {
          expect(el(`current_passwordErrorMessage`)).toBeTruthy();
        });
      });

      it("Apiエラーメッセージ", async () => {
        // ApiResponse
        mockAxios.onPut(registration).reply(422, errorResult);

        // 各項目に値を入力
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);
        await userEvent.type(el(formInfo[4].testId), formInfo[4].value);

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));
        // 各項目に対応したApiからのエラーメッセージが表示
        await waitFor(() => {
          expect(el(`${idNames[0]}ApiError`)).toBeTruthy();
        });
        await waitFor(() => {
          expect(el(`${idNames[1]}ApiError`)).toBeTruthy();
        });
        await waitFor(() => {
          expect(el(`${idNames[2]}ApiError`)).toBeTruthy();
        });
        await waitFor(() => {
          expect(el(`${idNames[3]}ApiError`)).toBeTruthy();
        });
        await waitFor(() => {
          expect(el(`${idNames[4]}ApiError`)).toBeTruthy();
        });
      });

      it("ゲストユーザ専用エラーメッセージ", async () => {
        mockAxios.onPut(registration).reply(422, errorResult);

        // 各項目に値を入力
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);
        await userEvent.type(el(formInfo[4].testId), formInfo[4].value);

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // ゲストエラーの項目にメッセージが表示
        await waitFor(() => {
          expect(el(`${guestIdNames[0]}ApiError`)).toBeTruthy();
        });
      });
    });

    describe("送信ボタン", () => {
      it("送信ボタンがある", () => {
        expect(el("formSubmit")).toHaveAttribute("type", "submit");
      });

      it("送信結果に応じてボタンの要素が変化 Status200", async () => {
        // ApiResponse
        mockAxios.onPut(registration).reply(200, result.data, result.headers);

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);
        await userEvent.type(el(formInfo[4].testId), formInfo[4].value);

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("Profile Edit!");
        expect(el("formSubmit")).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // 送信完了
        await waitFor(() =>
          expect(el("formSubmit")).toHaveTextContent("送信完了!")
        );
      });

      it("送信結果に応じてボタンの要素が変化 Status422", async () => {
        // ApiResponse
        mockAxios.onPut(registration).reply(422, errorResult);

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);
        await userEvent.type(el(formInfo[4].testId), formInfo[4].value);

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("Profile Edit!");
        expect(el("formSubmit")).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // APIからエラーが返ってくると初期値に戻る
        await waitFor(() =>
          expect(el("formSubmit")).toHaveTextContent("Profile Edit!")
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
