import React from "react";
import { Router } from "react-router-dom";
import { render , screen,cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import App from '../App';


// Helper function
const renderWithRouter = (component: any) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

afterEach(cleanup);

describe('App', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  })

  it("Headerコンポーネント", () =>{
    const header = screen.getByTestId("header");

    expect(header).toBeTruthy();
  });
});