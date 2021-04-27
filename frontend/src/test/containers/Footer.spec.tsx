import React from 'react';
import { Router } from 'react-router-dom';
import { render , screen, cleanup} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import { Footer } from '../../containers/Footer';


const renderWithRouter = (component: any) => {
  const history = createMemoryHistory();
  return render(<Router history={history}>{component}</Router>)
};

const el = screen.getByTestId;
afterEach(cleanup);

describe('Footer', () => {
  beforeEach(() => renderWithRouter(<Footer />))

  it('footerが表示',() => {
    expect(el('footer')).toBeTruthy();
  })

  it('LinkItems', () => {
    // 制作者TwitterLink
    expect(el('twitterLink')).toHaveAttribute('href', 'https://twitter.com/k_kyube');
  })
})