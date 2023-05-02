import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { el } from "../../helpers";
import { AboutDialog } from "../../../components/about";
afterEach(cleanup);

const state = {
  title: "testTitle",
  jsxElement: <div>TestElement</div>,
};
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
  const setup = () =>
    customRender(
      <AboutDialog
        isOpen={true}
        state={state}
        handleClose={jest.fn()}
        onCategory={jest.fn()}
      />
    );

  it("Dialog表示", () => {
    setup();
    expect(el("aboutDialog")).toBeTruthy();
  });
  it("要素の確認", () => {
    setup();
    expect(el("appBar")).toBeTruthy();
    expect(el("title")).toHaveTextContent(state.title);
    expect(el("contents")).toContainElement(el("main"));
    expect(el("contents")).toContainElement(el("categories"));
    expect(el("categories")).toContainElement(el("categoryProfile"));
    expect(el("categories")).toContainElement(el("categoryTool"));
    expect(el("categories")).toContainElement(el("categoryFeatureList"));
  });
});
