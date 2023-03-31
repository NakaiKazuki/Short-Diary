import { render, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ContactContext } from "../../contexts/Contact";
import { MessageContext } from "../../contexts/Message";
import { AuthContext } from "../../contexts/Auth";
import { Contact } from "../../containers/Contact";
import { contact } from "../../urls";
import { el } from "../helpers";

// types
import {
  IAuthProviderProps,
  IContactProviderProps,
  IMessageProviderProps,
} from "../../types/test";

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

const errorOverView = "123456789012345678901234567890123456789012345678901";

const currentUser = {
  id: 1,
  name: "test",
  email: "test@example.com",
};

const contactProviderProps = {
  value: {
    open: true,
    setOpenContact: jest.fn(),
  },
};

const messageProviderProps = {
  value: {
    message: undefined,
    setMessage: jest.fn(),
  },
};

const customRender = (
  ui: JSX.Element,
  contactProviderProps: IContactProviderProps,
  messageProviderProps: IMessageProviderProps,
  authProviderProps: IAuthProviderProps
) => {
  const routes = [
    {
      path: "/",
      element: (
        <ContactContext.Provider {...contactProviderProps}>
          <AuthContext.Provider {...authProviderProps}>
            <MessageContext.Provider {...messageProviderProps}>
              {ui}
            </MessageContext.Provider>
          </AuthContext.Provider>
        </ContactContext.Provider>
      ),
    },
  ];
  const router = createMemoryRouter(routes);
  return render(<RouterProvider router={router} />);
};

const setup = (authProviderProps: IAuthProviderProps) =>
  customRender(
    <Contact />,
    contactProviderProps,
    messageProviderProps,
    authProviderProps
  );

describe("Contact", () => {
  describe("ログインしている場合", () => {
    const authProviderProps = {
      value: {
        currentUser: currentUser,
        setCurrentUser: jest.fn(),
      },
    };
    beforeEach(() => {
      setup(authProviderProps);
    });

    it("Form初期値", () => {
      expect(el("nameArea")).toHaveValue(currentUser.name);
      expect(el("emailArea")).toHaveValue(currentUser.email);
    });
  });

  describe("ログインしていない場合", () => {
    const authProviderProps = {
      value: {
        currentUser: undefined,
        setCurrentUser: jest.fn(),
      },
    };
    beforeEach(() => setup(authProviderProps));
    it("Form初期値", () => {
      expect(el("nameArea")).toHaveValue("未登録");
      expect(el("emailArea")).toHaveValue("");
    });
  });

  describe("共通", () => {
    const authProviderProps = {
      value: {
        currentUser: undefined,
        setCurrentUser: jest.fn(),
      },
    };
    beforeEach(() => setup(authProviderProps));

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
      await userEvent.type(el("overViewArea"), errorOverView);
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
