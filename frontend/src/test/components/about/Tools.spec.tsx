import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { el } from "../../helpers";
import { Tools } from "../../../components/about/Tools";
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

describe("AboutDialog コンポーネント", () => {
  const setup = () => customRender(<Tools />);
  it("要素の確認", () => {
    setup();
    expect(el("tools")).toContainElement(el("react"));
    expect(el("tools")).toContainElement(el("rails"));
    expect(el("tools")).toContainElement(el("aws"));
    expect(el("tools")).toContainElement(el("others"));
  });
});
