import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { el } from "../../helpers";
import { FeatureList } from "../../../components/about/FeatureList";
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
  const setup = () => customRender(<FeatureList />);
  it("要素の確認", () => {
    setup();
    expect(el("featureList")).toContainElement(el("react"));
    expect(el("featureList")).toContainElement(el("rails"));
    expect(el("featureList")).toContainElement(el("gitHubActions"));
    expect(el("featureList")).toContainElement(el("test"));
    expect(el("featureList")).toContainElement(el("er"));
  });
});
