import "@testing-library/jest-dom";
import { render, cleanup, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { authAtom, messageAtom } from "../../atoms";
import { UserEdit } from "../../containers/UserEdit";
import { registration } from "../../urls";
import { el } from "../helpers";

// types
import { TLinks } from "../../types/test";

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

// 送信ボタン下にあるリンクの情報
const linkInfo: TLinks = [
  {
    url: "/",
    text: "Home",
  },
];

const errorResult = {
  errors: {
    guest: ["guest ResultError"],
    name: ["name ResultError"],
    email: ["email ResultError"],
    password: ["password ResultError"],
    password_confirmation: ["password_confirmation ResultError"],
    current_password: ["current_password ResultError"],
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
        set(authAtom, currentUser);
      }}
    >
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

describe("UserEditコンポーネント", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });
  const setup = () => customRender(<UserEdit />);
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

        // 初期値の入ってない項目に有効な値を入力
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);
        await userEvent.type(el(formInfo[4].testId), formInfo[4].value);

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
        await waitFor(() => {
          expect(el(`${idNames[4]}ResultError`)).toBeTruthy();
        });
      });

      it("ゲストユーザ専用エラーメッセージ", async () => {
        mockAxios.onPut(registration).reply(422, errorResult);

        // 初期値の入ってない項目に有効な値を入力
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);
        await userEvent.type(el(formInfo[4].testId), formInfo[4].value);

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // ゲストエラーの項目にメッセージが表示
        await waitFor(() => {
          expect(el(`${guestIdNames[0]}ResultError`)).toBeTruthy();
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

        // 初期値の入ってない項目に有効な値を入力
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);
        await userEvent.type(el(formInfo[4].testId), formInfo[4].value);

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("編集する");
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

        // 初期値の入ってない項目に有効な値を入力
        await userEvent.type(el(formInfo[2].testId), formInfo[2].value);
        await userEvent.type(el(formInfo[3].testId), formInfo[3].value);
        await userEvent.type(el(formInfo[4].testId), formInfo[4].value);

        // 初期値
        expect(el("formSubmit")).toHaveTextContent("編集する");
        expect(el("formSubmit")).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // APIからエラーが返ってくると初期値に戻る
        await waitFor(() =>
          expect(el("formSubmit")).toHaveTextContent("編集する")
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
