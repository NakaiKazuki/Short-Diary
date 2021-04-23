import React from 'react';
import { render , screen, cleanup} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { Home } from '../../containers/Home';
import { CurrentUserContext } from '../../contexts/CurrentUser';

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
const customRender = (ui: JSX.Element, { providerProps}: {providerProps: IProviderProps}) => {
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

describe('Homeコンポーネント',  () => {
  describe('ログアウト時', () => {
    const providerProps = {
      value:{
        currentUser: undefined,
        setCurrentUser: jest.fn(),
      }
    };

    it('LogoutHomeコンポーネントが開かれている', () => {
      customRender(<Home />,{providerProps})
      const logoutHome = screen.getByTestId('logoutHome');

      expect(logoutHome).toBeTruthy();
    })
  })

  describe('ログイン時', () => {
    const providerProps = {
      value:{
        currentUser: currentUser,
        setCurrentUser: jest.fn(),
      }
    };

    it('LoginHomeコンポーネントが開かれている', () => {
      customRender(<Home />,{providerProps})
      const loginHome = screen.getByTestId('loginHome');

      expect(loginHome).toBeTruthy();
    })
  })
});