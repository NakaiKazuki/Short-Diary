import React from 'react';
import { render , screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PagenationArea } from '../../components/PagenationArea';

const pagy = {
  page: 1,
  pages: 1,
}

afterEach(cleanup);

describe('PagenationArea コンポーネント', () => {
  beforeEach(() => {
    render(
      <PagenationArea
        pagy={pagy}
        onPageChange={jest.fn()}
      />
    )
  })

  it('Pagenation欄がある', () => {
    const pagenationBar = screen.getByTestId('pagenationBar');
    expect(pagenationBar).toBeTruthy();
  })
});