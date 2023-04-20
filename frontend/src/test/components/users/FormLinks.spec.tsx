import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { FormLinks } from "../../../components/users";
import { el } from "../../helpers";

afterEach(cleanup);

const customRender = (ui: JSX.Element) => {
  const routes = [
    {
      path: "/",
      element: ui,
    },
  ];
  const router = createMemoryRouter(routes);
  return render(<RouterProvider router={router} />);
};

const linkInfo = [
  {
    url: "/testurl1",
    text: "Test Text1",
  },
  {
    url: "/testurl2",
    text: "Test Text2",
  },
];

describe("FormLinks コンポーネント", () => {
  const setup = () => customRender(<FormLinks linkInfo={linkInfo} />);
  it("配列の要素の数、要素の内容次第で変化する", () => {
    setup();
    // linkInfo[0] によって表示される内容
    linkInfo.forEach((obj, index) => {
      expect(el(`formLink-${index}`)).toHaveAttribute(`href`, obj.url);
      expect(el(`formLink-${index}`)).toHaveTextContent(obj.text);
    });
  });
});
