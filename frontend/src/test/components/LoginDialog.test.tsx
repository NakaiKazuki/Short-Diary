import React from "react";
import { render , screen, cleanup} from "@testing-library/react";
import { LoginDialog } from '../../components/LoginDialog';
import { useInput } from '../../customHooks'

beforeEach(() => {
  const email = useInput("");
  const password  = useInput("");
  const onClickLogin = jest.fn();
  const onClose = jest.fn();

  render(<LoginDialog
            isOpen={true}
            email={email}
            password={password}
            onClickLogin={onClickLogin}
            onClose={onClose}
        />);
})

afterEach(cleanup);

describe("Login Dialog コンポーネント",() => {
  describe("要素の確認", () => {

    test("メールアドレス入力欄", () => {
      const emailArea = screen.getByTestId("emailArea");

      expect(emailArea).toBeTruthy();
    })

    test("パスワード入力欄", () => {
      const passwordArea = screen.getByTestId("passwordArea");

      expect(passwordArea).toBeTruthy();
    })

    test("送信ボタン", () => {
      const formSubmit = screen.getByTestId("formSubmit");

      expect(formSubmit).toBeTruthy();
    })
  })
})