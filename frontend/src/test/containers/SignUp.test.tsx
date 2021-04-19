import React from "react";
import { render , screen, cleanup} from "@testing-library/react";
import { Router } from "react-router-dom";
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from "history";
import { SignUp } from '../../containers/SignUp';

const renderWithRouter = (component: any) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

afterEach(cleanup);

describe('SignUpコンポーネント', () => {
  beforeEach(() => {
    renderWithRouter(<SignUp />)
  })

  it('Formがある', () => {
    const signUpForm = screen.getByTestId("signUpForm");

    expect(signUpForm).toBeTruthy();
  })

  it('Linkが1個ある', () => {
    const formLinkItem = screen.getByTestId("formLinkItem-0");

    expect(formLinkItem).toBeTruthy();
  })

  describe('送信ボタン',() => {
    it('送信ボタンがある', () => {
      const signUpSubmit = screen.getByTestId("signUpSubmit");

      expect(signUpSubmit).toBeTruthy();
    })

    it('ボタンtext', () => {
      const signUpSubmit = screen.getByTestId("signUpSubmit");

      expect(signUpSubmit).toHaveTextContent('SignUp!')
    })
  })
})