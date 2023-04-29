import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
import { el } from "../../helpers";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { SignUpDilalog } from "../../../components/users/SignUpDialog";

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
    <HelmetProvider>
      <RouterProvider router={router} />;
    </HelmetProvider>
  );
};

const setup = () => {
  customRender(<SignUpDilalog isOpen={true} handleClose={jest.fn()} />);
};

describe("SignUpDialog", () => {
  beforeEach(() => {
    setup();
  });

  describe("", () => {
    it("要素の確認", () => {
      expect(el("signUpDialog")).toContainElement(el("signUpForm"));
    });
  });
});
