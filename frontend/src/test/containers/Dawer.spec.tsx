import "@testing-library/jest-dom";
import { render, cleanup, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { drawerAtom } from "../../atoms/Drawer";
import { authAtom } from "../../atoms/Auth";
import { Drawer } from "../../containers/Drawer";
import { el } from "../helpers";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

afterEach(cleanup);

const currentUser = {
  id: 1,
  name: "test",
  email: "test@example.com",
};

const customRender = (
  ui: JSX.Element,
  currentUser: ICurrentUser | undefined,
  open: boolean
) => {
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
        set(drawerAtom, open);
        set(authAtom, currentUser);
      }}
    >
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

const setup = (currentUser: ICurrentUser | undefined, open: boolean) => {
  customRender(<Drawer />, currentUser, open);
};

describe("Drawer", () => {
  describe("ログインしてドロワーが開かれている場合", () => {
    beforeEach(() => {
      setup(currentUser, true);
    });

    it("要素の確認", () => {
      expect(el("drawer")).toBeTruthy();
      expect(el("drawer")).toContainElement(el("linksDrawer"));
      expect(el("linksDrawer")).toContainElement(el("homeLink"));
      expect(el("linksDrawer")).toContainElement(el("photoGalleyLink"));
    });
  });

  describe("ログインしていてドロワーが閉じられている場合", () => {
    beforeEach(() => setup(undefined, false));
    it("Draweはない", () => {
      expect(screen.queryByTestId("drawer")).toBeFalsy();
    });
  });

  describe("ログインしていない場合", () => {
    beforeEach(() => setup(undefined, true));
    it("Draweはない", () => {
      expect(screen.queryByTestId("drawer")).toBeFalsy();
    });
  });
});
