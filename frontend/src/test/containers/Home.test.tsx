import React from "react";
import { render ,cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from '../../containers/Home';

afterEach(cleanup);

describe('Home', () => {
  test('新規登録ボタンがある', () => {
    const { container , getByTestId} = render(<Home />);

    const signUpButton = getByTestId("signUpButton");
    expect(container).toContainElement(signUpButton);
  });


  test('ゲストログインボタンがある', () => {
    const { container , getByTestId} = render(<Home />);

    const guestLoginButton = getByTestId("guestLoginButton");
    expect(container).toContainElement(guestLoginButton);
  });
});