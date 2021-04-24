import React from 'react';
import '@testing-library/jest-dom';
import { render , screen, cleanup, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { CurrentUserContext } from '../../contexts/CurrentUser';
import { LoginHome } from '../../containers/LoginHome';

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
    setCurrentUser: jest.Mock<React.Dispatch<React.SetStateAction<undefined>>>;
  }
}

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

const providerProps = {
  value:{
    currentUser: currentUser,
    setCurrentUser: jest.fn(),
  }
}

// const mockAxios = new MockAdapter(axios);
// mockAxios.onPost(guestSignIn).reply(200,
//   {
//     headers: {
//       'access-token': 'testtoken',
//       client: 'testclient',
//       uid: 'test@example.com',
//     },
//     data: {
//       id: 1,
//       name: 'test',
//       email: 'test@example.com',
//     },
//   },
// );

const customRender = (ui: JSX.Element, { providerProps }: {providerProps: IProviderProps}) => {
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

describe('LoginHome', () =>{

  beforeEach(() => {
    customRender(<LoginHome />,{providerProps})
  })
})