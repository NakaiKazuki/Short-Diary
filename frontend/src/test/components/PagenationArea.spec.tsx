import React from 'react';
import { render , screen, cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { CurrentUserContext } from '../../contexts/CurrentUser';
import { PagenationArea } from '../../components/PagenationArea';

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
};

const pagy = {
  page: 1,
  pages: 1,
}

afterEach(cleanup);

describe('PagenationArea コンポーネント', () => {
  beforeEach(() => {
    customRender(
      <PagenationArea
        pagy={pagy}
        onPageChange={jest.fn()}
      />,
      {providerProps}
    )
  })

  it('Pagenation欄がある', () => {
    const pagenationBar = screen.getByTestId('pagenationBar');
    expect(pagenationBar).toBeTruthy();
  })
});