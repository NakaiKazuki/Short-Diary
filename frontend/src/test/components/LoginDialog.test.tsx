import React from "react";
import { render , screen, cleanup} from "@testing-library/react";
import { LoginDialog } from '../../components/LoginDialog';

beforeEach(() => {
  const onClickLogin = jest.fn();
  const onClose = jest.fn();
  render(<LoginDialog isOpen={true} onClickLogin={onClickLogin} onClose={onClose} />);
})

afterEach(cleanup);

describe("Login Dialog コンポーネント",() => {
  describe("要素の存在確認", () => {

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