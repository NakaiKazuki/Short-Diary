import { render , screen,cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

const el = screen.getByTestId;

afterEach(cleanup);

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  })

  it('Headerコンポーネント', () =>{
    expect(el('header')).toBeTruthy();
  });
});