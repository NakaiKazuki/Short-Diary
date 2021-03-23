import React from "react";
import { render , screen, cleanup} from "@testing-library/react";
import { SignupDialog } from '../../components/SignUpDialog';

beforeEach(() => {
  const onClickSignUp = jest.fn();
  const onClose = jest.fn();
  render(<SignupDialog isOpen={true} onClickSignUp={onClickSignUp} onClose={onClose} />);
})

afterEach(cleanup);

describe("SignupDialog コンポーネント",() => {
  describe("要素の存在確認", () => {
    test("名前入力欄", () => {
      const nameArea = screen.getByTestId("nameArea");

      expect(nameArea).toBeTruthy();
    })

    test("メールアドレス入力欄", () => {
      const emailArea = screen.getByTestId("emailArea");

      expect(emailArea).toBeTruthy();
    })

    test("パスワード入力欄", () => {
      const passwordArea = screen.getByTestId("passwordArea");

      expect(passwordArea).toBeTruthy();
    })

    test("確認用パスワード入力欄", () => {
      const passwordConfirmationArea = screen.getByTestId("passwordConfirmationArea");

      expect(passwordConfirmationArea).toBeTruthy();
    })

    test("送信ボタン", () => {
      const formSubmit = screen.getByTestId("formSubmit");

      expect(formSubmit).toBeTruthy();
    })
  })
})