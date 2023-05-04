import "@testing-library/jest-dom";
import { render, cleanup, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import { contactAtom } from "../../recoils/Contact";
import { messageAtom } from "../../recoils/Message";
import { authAtom } from "../../recoils/Auth";
import { Contact } from "../../utils/Contact";
import { contact } from "../../urls";
import { el, testString } from "../helpers";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

afterEach(cleanup);

const mockAxios = new MockAdapter(axios);
const result = {
  message: ["testData"],
};

const errorResult = {
  errors: {
    name: ["name ResultError"],
    email: ["email ResultError"],
    over_view: ["over_view ResultError"],
    content: ["cotent ResultError"],
  },
};

const currentUser = {
  id: 1,
  name: "test",
  email: "test@example.com",
};

const customRender = (
  ui: JSX.Element,
  currentUser: ICurrentUser | undefined
) => {
  const routes = [
    {
      path: "/",
      element: ui,
    },
  ];
  const router = createMemoryRouter(routes);
  return render(
    <HelmetProvider>
      <RecoilRoot
        initializeState={({ set }) => {
          set(contactAtom, true);
          set(messageAtom, undefined);
          set(authAtom, currentUser);
        }}
      >
        <RouterProvider router={router} />
      </RecoilRoot>
      ;
    </HelmetProvider>
  );
};

const setup = (currentUser: ICurrentUser | undefined) => {
  customRender(<Contact />, currentUser);
};

describe("Contact", () => {
  describe("ログインしている場合", () => {
    beforeEach(() => {
      setup(currentUser);
    });

    it("Form初期値", () => {
      expect(el("nameArea")).toHaveValue(currentUser.name);
      expect(el("emailArea")).toHaveValue(currentUser.email);
      expect("a");
    });
  });

  describe("ログインしていない場合", () => {
    beforeEach(() => setup(undefined));
    it("Form初期値", () => {
      expect(el("nameArea")).toHaveValue("未登録");
      expect(el("emailArea")).toHaveValue("");
    });
  });

  describe("共通", () => {
    beforeEach(() => setup(undefined));

    it("入力欄", () => {
      expect(el("contactForm")).toContainElement(el("nameArea"));
      expect(el("contactForm")).toContainElement(el("emailArea"));
      expect(el("contactForm")).toContainElement(el("overViewArea"));
      expect(el("contactForm")).toContainElement(el("contentArea"));
    });

    it("送信ボタン", () => {
      expect(el("contactForm")).toContainElement(el("formSubmit"));
    });

    it("エラーメッセージ", async () => {
      // ApiResponse
      mockAxios.onPost(contact).reply(200, result);

      // 各項目に無効な値を入力
      await userEvent.clear(el("nameArea"));
      await userEvent.clear(el("emailArea"));
      await userEvent.type(el("overViewArea"), testString(6));
      await userEvent.clear(el("contentArea"));

      // ユーザが送信ボタンをクリック
      await userEvent.click(el("formSubmit"));

      // 各項目に対応したエラーメッセージが表示
      await waitFor(() => {
        expect(el("nameError")).toBeTruthy();
      });
      await waitFor(() => {
        expect(el("emailError")).toBeTruthy();
      });
      await waitFor(() => {
        expect(el("overViewError")).toBeTruthy();
      });
      await waitFor(() => {
        expect(el("contentError")).toBeTruthy();
      });
    });

    it("Apiエラーメッセージ", async () => {
      // ApiResponse
      mockAxios.onPost(contact).reply(422, errorResult);

      // 各項目に値を入力
      await userEvent.type(el("nameArea"), "testName");
      await userEvent.type(el("emailArea"), "test@example.com");
      await userEvent.type(el("overViewArea"), "testOverView");
      await userEvent.type(el("contentArea"), "testContent");

      // ユーザが送信ボタンをクリック
      await userEvent.click(el("formSubmit"));

      // 各項目に対応したApiエラーメッセージが表示
      await waitFor(() => {
        expect(el("nameResultError")).toBeTruthy();
      });
      await waitFor(() => {
        expect(el("emailResultError")).toBeTruthy();
      });
      await waitFor(() => {
        expect(el("overViewResultError")).toBeTruthy();
      });
      await waitFor(() => {
        expect(el("contentResultError")).toBeTruthy();
      });
    });
  });
});
