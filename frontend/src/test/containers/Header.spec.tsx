import React from 'react';
import { Router } from 'react-router-dom';
import { render , screen, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
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

const customRender = (ui: any, { providerProps }: {providerProps: IProviderProps}) => {
  const history = createMemoryHistory();
  return (
    render(
      <Router history={history}>
        <CurrentUserContext.Provider {...providerProps}>{ui}</CurrentUserContext.Provider>
      </Router>
    )
  );
};


const currentUser = {
  headers: {
    'access-token': 'testtoken',
    client: 'testclient',
    uid: 'test@example.com',
  },
  data: {
    id: 1,
    name: 'test',
    email: 'test@example.com',
  },
};

afterEach(cleanup);

describe('Header コンポーネント', () => {
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

    it('ホーム画面へのリンク', () => {
      const homeLink = screen.getByTestId('homeLink');

      expect(homeLink ).toBeTruthy();
    })

    it('ログインページへのリンク', () => {
      const loginLink = screen.getByTestId('loginLink');

      expect(loginLink).toHaveAttribute('href', '/login');
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

    it('ホーム画面へのリンク', () => {
      const homeLink = screen.getByTestId('homeLink');

      expect(homeLink).toHaveAttribute('href', '/');
    })

    it('ユーザアイコンが表示', () => {
      const userIcon = screen.getByTestId('userIcon');

      expect(userIcon).toBeTruthy();
    })

    describe('MenuBar',() => {
      it('MenuBarの表示', () => {
        const menuBar = screen.getByTestId('menuBar');
        // デフォルトは非表示
        expect(menuBar).toHaveStyle('visibility: hidden');

        // ユーザがクリックすることで表示
        userEvent.click(screen.getByTestId('userIcon'));
        expect(menuBar).toHaveStyle('visibility: visible');
      })

      it('Logoutボタン', () => {
        const menuBar = screen.getByTestId('menuBar');
        const logoutButton = screen.getByTestId('logoutButton');

        expect(menuBar).toContainElement(logoutButton);
      })
    });
  })
});