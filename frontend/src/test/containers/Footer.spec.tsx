import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ContactContext } from "../../contexts/Contact";
import { Footer } from "../../containers/Footer";

const el = screen.getByTestId;
afterEach(cleanup);

interface IProviderProps {
  value: {
    open: boolean;
    setOpenContact: jest.Mock<React.Dispatch<React.SetStateAction<boolean>>>;
  };
}

const providerProps = {
  value: {
    open: false,
    setOpenContact: jest.fn(),
  },
};
const customRender = (ui: JSX.Element, providerProps: IProviderProps) => {
  const routes = [
    {
      path: "/",
      element: (
        <ContactContext.Provider {...providerProps}>
          {ui}
        </ContactContext.Provider>
      ),
    },
  ];
  const router = createMemoryRouter(routes);
  return render(<RouterProvider router={router} />);
};
describe("Footer", () => {
  const setup = () => customRender(<Footer />, providerProps);

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
