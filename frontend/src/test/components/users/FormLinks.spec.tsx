import React from 'react';
import { render , screen, cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { FormLinks } from '../../../components/users/FormLinks';

const renderWithRouter = (component: any) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

const linkInfo =  [
  {
    url: '/testurl1',
    text: 'Test Text1',
  },
  {
    url: '/testurl2',
    text: 'Test Text2',
  }
];

afterEach(cleanup);

describe('FormLinks コンポーネント', () => {
  beforeEach(() => {
    renderWithRouter(
      <FormLinks
        linkInfo={linkInfo}
      />
    )
  })

  it('配列の要素の数、要素の内容次第で変化する', () => {
    // linkInfo[0] によって表示される内容
    const linkItem1 = screen.getByTestId('formLinkItem-0');
    expect(linkItem1).toHaveAttribute('href', '/testurl1');
    expect(linkItem1).toHaveTextContent('Test Text1');

    // linkInfo[1] によって表示される内容
    const linkItem2 = screen.getByTestId('formLinkItem-1');
    expect(linkItem2).toHaveAttribute('href', '/testurl2');
    expect(linkItem2).toHaveTextContent('Test Text2');
  })
});