import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { authAtom } from "../../recoils/Auth";
import { LogoutHome } from "../../containers/LogoutHome";
import {
  createIntersectionObserver,
  createResizeObserver,
  el,
} from "../helpers";

createIntersectionObserver();
createResizeObserver();
afterEach(cleanup);
// IntersectionObserverのモックを作成

const customRender = (ui: JSX.Element) => {
  const routes = [
    {
      path: "/",
      element: ui,
    },
  ];
  const router = createMemoryRouter(routes);
  render(
    <HelmetProvider>
      <RecoilRoot
        initializeState={({ set }) => {
          set(authAtom, undefined);
        }}
      >
        <RouterProvider router={router} />
      </RecoilRoot>
    </HelmetProvider>
  );
};

describe("LogoutHome", () => {
  const setup = () => customRender(<LogoutHome />);
  beforeEach(() => setup());

  it("要素の確認(スマートフォン以外の場合)", () => {
    expect(el("logoutHome")).toContainElement(el("logoutHomeCanvas"));
  });
});
