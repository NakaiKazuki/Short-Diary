import "@testing-library/jest-dom";
import { render, cleanup, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { messageAtom } from "../../atoms";
import { NewPassword } from "../../containers/NewPassword";
import { password } from "../../urls";
import { el } from "../helpers";

afterEach(cleanup);

// 正しいForm情報
const formInfo = [
  {
    testId: "passwordArea",
    value: "testPassword",
  },
  {
    testId: "password_confirmationArea",
    value: "testPassword",
  },
];

const errorResult = {
  errors: {
    password: ["password ResultError"],
    password_confirmation: ["password_confirmation ResultError"],
  },
};
// ?access-token=testaccess&client=testclient&token=testtoken&uid=test%40test.com
const customRender = (ui: JSX.Element) => {
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(messageAtom, undefined);
      }}
    >
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/",
            search:
              "?access-token=testaccess&client=testclient&token=testtoken&uid=test%40test.com",
          },
        ]}
      >
        {ui}
      </MemoryRouter>
    </RecoilRoot>
  );
};

const idNames = ["password", "password_confirmation"];

const mockAxios = new MockAdapter(axios);

describe(" NewPasswordコンポーネント", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });

  const setup = () => customRender(<NewPassword />);
  beforeEach(() => setup());
  describe("Form欄", () => {
    it("Formがある", () => {
      expect(el("newPasswordForm")).toBeTruthy();
    });

    describe("Form入力欄", () => {
      it("各入力欄のブロックがある", () => {
        idNames.forEach((idName) =>
          expect(el("newPasswordForm")).toContainElement(
            el(`FormItem-${idName}`)
          )
        );
      });

      it("エラーメッセージ", async () => {
        // ApiResponse
        mockAxios.onPut(password).reply(200, {});

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
        mockAxios.onPut(password).reply(401, errorResult);

        // 各項目に値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));
        // 各項目に対応したApiからのエラーメッセージが表示
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
        mockAxios.onPut(password).reply(200, { status: 200 });

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);

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
        mockAxios.onPut(password).reply(422, errorResult);

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[0].testId), formInfo[0].value);
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);

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
});
