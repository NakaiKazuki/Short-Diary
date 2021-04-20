import React from "react";
import { Router } from "react-router-dom";
import { render , screen, cleanup} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
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
  return (
    render(
      <Router history={history}>
        <CurrentUserContext.Provider {...providerProps}>{ui}</CurrentUserContext.Provider>
      </Router>, renderOptions
    )
  );
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
};

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

    it("ホーム画面へのリンク", () => {
      const homeLink = screen.getByTestId("homeLink");

      expect(homeLink ).toBeTruthy();
    })

    it("ログインボタン", () => {
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

    it("ホーム画面へのリンク", () => {
      const homeLink = screen.getByTestId("homeLink");

      expect(homeLink ).toBeTruthy();
    })

    it("ユーザアイコンが表示", () => {
      const userIcon = screen.getByTestId("userIcon");

      expect(userIcon).toBeTruthy();
    })

    describe('MenuBar',() => {
      beforeEach(() => {
        userEvent.click(screen.getByTestId("userIcon"));
      })

      it("IconクリックでMenuBar表示", () => {
        const menuBar = screen.getByTestId("menuBar")

        expect(menuBar).toBeTruthy();
      })

      it("Logoutボタン", () => {
        const logoutButton = screen.getByTestId("logoutButton")

        expect(logoutButton).toBeTruthy();
      })
    });
  })
});