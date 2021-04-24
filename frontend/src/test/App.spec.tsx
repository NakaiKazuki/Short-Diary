import { render , screen,cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';


afterEach(cleanup);

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  })

  it('Headerコンポーネント', () =>{
    const header = screen.getByTestId('header');

    expect(header).toBeTruthy();
  });
});