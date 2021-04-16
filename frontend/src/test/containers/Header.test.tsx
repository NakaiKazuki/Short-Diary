import React from "react";
import { Router } from "react-router-dom";
import { render , screen, cleanup} from "@testing-library/react";
import { createMemoryHistory } from "history";
import '@testing-library/jest-dom';
import { CurrentUserContext } from '../../contexts/CurrentUser';
import { Header } from '../../containers/Header';

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

const currentUser = {
  headers: {
    'access-token': "testtoken",
    client: "testclient",
    uid: "test@example.com",
  },
  data: {
    id: 1,
    name: "test",
    email: "test@example.com",
  },
}

afterEach(cleanup);

describe("Header コンポーネント", () => {
  describe('ログアウト時', () => {
    const providerProps = {
      value:{
        currentUser: undefined,
        setCurrentUser: jest.fn(),
      }
    };

    beforeEach(() => {
      customRender(<Header />,{providerProps})
    })

    test("ホーム画面へのリンク", () => {
      const homeLink = screen.getByTestId("homeLink");

      expect(homeLink ).toBeTruthy();
    })

    test("ログインボタン", () => {
      const loginButton = screen.getByTestId("loginButton");

      expect(loginButton).toHaveAttribute('type', 'button')
    })
  })

  describe('ログイン時', () => {
    const providerProps = {
      value:{
        currentUser: currentUser,
        setCurrentUser: jest.fn(),
      }
    };

    beforeEach(() => {
      customRender(<Header />,{providerProps})
    })

    test("ホーム画面へのリンク", () => {
      const homeLink = screen.getByTestId("homeLink");

      expect(homeLink ).toBeTruthy();
    })
    test("ユーザメニュー欄", () => {
      const userIcon = screen.getByTestId("userIcon");

      expect(userIcon).toBeTruthy();
    })
  })
});