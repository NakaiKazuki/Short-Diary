import React from 'react';
import '@testing-library/jest-dom';
import { render , screen, cleanup, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { CurrentUserContext } from '../../../contexts/CurrentUser';
import { LogoutHome } from '../../../containers/homes/LogoutHome';
import { guestSignIn } from '../../../urls';

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

const mockAxios = new MockAdapter(axios);
mockAxios.onPost(guestSignIn).reply(200,
  {
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
  },
);

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

afterEach(cleanup);

describe('LogoutHome', () =>{
  const providerProps = {
    value:{
      currentUser: undefined,
      setCurrentUser: jest.fn(),
    }
  };

  beforeEach(() => {
    customRender(<LogoutHome />,{providerProps})
  })

  it('ユーザ登録画面へのリンクがある', () => {
    const signUpLink = screen.getByTestId('signUpLink');

    expect(signUpLink).toHaveAttribute('href', '/signup');
  })

  describe('ゲストログインボタン',() =>{
    it('ゲストログインボタン', () => {
      const guestLoginButton = screen.getByTestId('guestLoginButton');

      expect(guestLoginButton).toHaveAttribute('type', 'button');
    })

    it('送信状況に応じてボタンの要素が変化', async() => {
      const guestLoginButton = screen.getByTestId('guestLoginButton');
      // 初期値
      expect(guestLoginButton).toHaveTextContent('ゲストログイン');
      expect(guestLoginButton).not.toBeDisabled();

      // ユーザがゲストログインボタンをクリック
      userEvent.click(guestLoginButton);

      // 送信中
      expect(guestLoginButton).toHaveTextContent('送信中...');
      expect(guestLoginButton).toBeDisabled();

      // 送信完了
      await waitFor(() => expect(screen.getByTestId('guestLoginButton')).toHaveTextContent('送信完了!'));
      await waitFor(() => expect(screen.getByTestId('guestLoginButton')).toBeDisabled());
    })
  })
})