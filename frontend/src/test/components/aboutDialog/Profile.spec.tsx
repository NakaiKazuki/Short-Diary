import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { el } from "../../helpers";
import { Profile } from "../../../components/aboutDiarlog/Profile";
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
  const setup = () => customRender(<Profile />);
  it("要素の確認", () => {
    setup();
    expect(el("profile")).toContainElement(el("introductionTitle"));
    expect(el("profile")).toContainElement(el("appExplanationTitle"));
    expect(el("profile")).toContainElement(el("messageTitle"));
  });
});
