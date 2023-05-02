import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { el } from "../helpers";
import { About } from "../../containers/About";
afterEach(cleanup);

const customRender = (ui: JSX.Element) => {
  const routes = [
    {
      path: "/",
      element: <HelmetProvider>{ui}</HelmetProvider>,
    },
  ];
  const router = createMemoryRouter(routes);
  return render(<RouterProvider router={router} />);
};

describe("About コンポーネント", () => {
  const setup = () => customRender(<About />);

  beforeEach(() => setup());

  it("要素の確認", () => {
    expect(el("title")).toBeTruthy();
    expect(el("contents")).toContainElement(el("main"));
    expect(el("contents")).toContainElement(el("categories"));
    expect(el("categories")).toContainElement(el("categoryProfile"));
    expect(el("categories")).toContainElement(el("categoryTool"));
    expect(el("categories")).toContainElement(el("categoryFeatureList"));
  });
});
