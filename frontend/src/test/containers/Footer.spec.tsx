import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { contactAtom } from "../../atoms/Contact";
import { Footer } from "../../containers/Footer";
import { el } from "../helpers";

afterEach(cleanup);

const customRender = (ui: JSX.Element) => {
  const routes = [
    {
      path: "/",
      element: ui,
    },
  ];
  const router = createMemoryRouter(routes);
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(contactAtom, false);
      }}
    >
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

describe("Footer", () => {
  const setup = () => customRender(<Footer />);

  beforeEach(() => setup());

  it("footerが表示", () => {
    expect(el("footer")).toBeTruthy();
  });

  it("LinkItems", () => {
    // 制作者TwitterLink
    expect(el("twitterLink")).toHaveAttribute(
      "href",
      "https://twitter.com/k_kyube"
    );
  });

  it("ContactButton", () => {
    expect(el("contactButton")).toBeTruthy();
  });
});
