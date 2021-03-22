import React from "react";
import { Router } from "react-router-dom";
import { render ,cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import App from '../App';
afterEach(cleanup);
// Helper function
const renderWithRouter = (component: any) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

describe('App', () => {
  test("Home containerへのRouteがある", () =>{
    const { container, getByTestId } = renderWithRouter(<App />);

    const home = getByTestId("homeContainer");
    expect(container).toContainElement(home);
  });
});