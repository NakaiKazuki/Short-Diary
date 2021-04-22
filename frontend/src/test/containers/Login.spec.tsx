import React from 'react';
import { render , screen, cleanup, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { CurrentUserContext } from '../../contexts/CurrentUser';
import { Login } from '../../containers/Login';
import { signIn } from '../../urls';

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

const mockAxios = new MockAdapter(axios);

// 正しいForm情報
const validInfo = [
  {
    testId: 'emailArea',
    value: 'test@example.com',
  },
  {
    testId: 'passwordArea',
    value: 'testPassword',
  },
];

// 不正なForm情報
const invalidInfo = [
  {
    testId: 'emailArea',
    value: '',
  },
  {
    testId: 'passwordArea',
    value: '',
  },
];

afterEach(cleanup);

describe('Loginコンポーネント', () => {
  const providerProps = {
    value:{
      currentUser: undefined,
      setCurrentUser: jest.fn(),
    }
  };

  beforeEach(() => {
    customRender(<Login />,{providerProps})
  })

  describe('Form欄', () => {
    it('Formがある', () => {
      const loginForm = screen.getByTestId('loginForm');

      expect(loginForm).toBeTruthy();
    })

    describe('Form入力欄', () => {
      const idNames = ['email', 'password'];

      it('Form内に各入力欄がある', () => {
        const loginForm = screen.getByTestId('loginForm');

        idNames.forEach(idName => expect(loginForm).toContainElement(screen.getByTestId(`FormItem-${idName}`)));
      })

      it('エラーメッセージ', async() => {
        // ApiResponse
        mockAxios.onPost(signIn).reply(200,
        {
          headers: {
            'access-token': 'testtoken',
            client: 'testclient',
            uid: 'test@example.com',
          },
          data: {
            id: 1,
            name: 'testName',
            email: 'test@example.com',
          },
        });

        // 各項目に無効な値を入力
        invalidInfo.forEach(obj => userEvent.type(screen.getByTestId(obj.testId), obj.value));

        // ユーザが送信ボタンをクリック
        const formSubmit = screen.getByTestId('formSubmit');
        userEvent.click(formSubmit);

        // 各項目に対応したエラーメッセージが表示
        await waitFor(() => {
          idNames.forEach(idName => expect(screen.getByTestId(`${idName}ErrorMessage`)).toBeTruthy());
        })
      })

      it('Apiエラーメッセージ', () => {
        // ApiResponse
        mockAxios.onPost(signIn).reply(401,
          {
            data: {
              errors:{
                email: ['email ApiError'],
                password: ['password ApiError'],
              }
            },
          },
        )

        // 各項目に値を入力
        validInfo.forEach(obj => userEvent.type(screen.getByTestId(obj.testId), obj.value));

        // ユーザが送信ボタンをクリック
        userEvent.click(screen.getByTestId('formSubmit'));

        // 各項目に対応したApiエラーメッセージが表示
        idNames.forEach(async idName => expect(await screen.findByTestId(`${idName}ApiError`)).toBeTruthy());
      })
    })


    describe('送信ボタン',() => {
      it('送信ボタンがある', () => {
        const formSubmit = screen.getByTestId('formSubmit');

        expect(formSubmit).toHaveAttribute('type', 'submit');
      })

      it('送信状況に応じてボタンの要素が変化 Status200', async() => {
        // ApiResponse
        mockAxios.onPost(signIn).reply(200,
        {
          headers: {
            'access-token': 'testtoken',
            client: 'testclient',
            uid: 'test@example.com',
          },
          data: {
            id: 1,
            name: 'testName',
            email: 'test@example.com',
          },
        });

        // 各項目に有効な値を入力
        validInfo.forEach(obj => userEvent.type(screen.getByTestId(obj.testId), obj.value));

        // 初期値
        const formSubmit = screen.getByTestId('formSubmit');
        expect(formSubmit).toHaveTextContent('Login!');
        expect(formSubmit).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        userEvent.click(formSubmit);

        // 送信完了
        await waitFor(() => expect(formSubmit).toHaveTextContent('送信完了!'));
        await waitFor(() => expect(formSubmit).toBeDisabled());
      })

      it('送信状況に応じてボタンの要素が変化 Status401', async() => {
        // ApiResponse
        mockAxios.onPost(signIn).reply(401,
          {
            data: {
              errors:{
                email: ['email ApiError'],
                password: ['password ApiError'],
              }
            },
          },
        )

        // 各項目に有効な値を入力
        validInfo.forEach(obj => userEvent.type(screen.getByTestId(obj.testId), obj.value));

        // 初期値
        const formSubmit = screen.getByTestId('formSubmit');
        expect(formSubmit).toHaveTextContent('Login!');
        expect(formSubmit).not.toBeDisabled();

        // ユーザが送信ボタンをクリック
        userEvent.click(formSubmit);

        // APIからエラーが返ってくると初期値に戻る
        await waitFor(() => expect(formSubmit).toHaveTextContent('Login!'));
        await waitFor(() => expect(formSubmit).not.toBeDisabled());
      })
    })
  })

  it('Links', () => {
    // ユーザ登録画面へのリンクがある
    expect(screen.getByTestId('formLinkItem-0')).toHaveAttribute('href', '/signup');
  })
})