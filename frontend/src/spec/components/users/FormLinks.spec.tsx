import React from 'react';
import { render , screen, cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { FormLinks } from '../../../components/users';

const renderWithRouter = (component: any) => {
  const history = createMemoryHistory();
  return render(<Router history={history}>{component}</Router>)
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

const el = screen.getByTestId;

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
    linkInfo.forEach((obj, index) =>{
      expect(el(`formLink-${index}`)).toHaveAttribute(`href`, obj.url);
      expect(el(`formLink-${index}`)).toHaveTextContent(obj.text);
    } )
  })
});