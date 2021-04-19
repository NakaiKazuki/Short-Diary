import React from "react";
import { Router } from "react-router-dom";
import { render , screen, cleanup} from "@testing-library/react";
import { createMemoryHistory } from "history";
import '@testing-library/jest-dom';
import { CurrentUserContext } from '../../../contexts/CurrentUser';
import { LogoutHome } from '../../../containers/homes/LogoutHome';

interface IHeaders {
  'access-token': string;
  client: string;
  uid: string;
}

interface IData {
  id: number;
  name: string;
  email: string;
}

interface ICurrentUser {
  data: IData;
  headers: IHeaders;
}

interface IProviderProps {
  value: {
    currentUser: ICurrentUser | undefined;
    setCurrentUser: jest.Mock<any, any>;
  }
}
const customRender = (ui: any, { providerProps, ...renderOptions }: {providerProps: IProviderProps}) => {
  const history = createMemoryHistory();
  return {
    ...render(
    <Router history={history}>
      <CurrentUserContext.Provider {...providerProps}>{ui}</CurrentUserContext.Provider>
    </Router>, renderOptions
    )};
};

afterEach(cleanup);

describe('LogoutHome', () =>{
  describe('ログアウト時', () => {
    const providerProps = {
      value:{
        currentUser: undefined,
        setCurrentUser: jest.fn(),
      }
    };

    beforeEach(() => {
      customRender(<LogoutHome />,{providerProps})
    })

    test('ユーザ登録画面へのリンク', () => {
      const signUpLink = screen.getByTestId("signUpLink");

      expect(signUpLink).toBeTruthy();
    })

    test('ゲストログインボタン', () => {
      const guestLoginButton = screen.getByTestId("guestLoginButton");

      expect(guestLoginButton).toHaveAttribute('type', 'button')
    })
  })
})