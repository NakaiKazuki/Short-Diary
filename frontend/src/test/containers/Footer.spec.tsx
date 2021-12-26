import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "../../containers/Footer";

const el = screen.getByTestId;
afterEach(cleanup);

describe("Footer", () => {
  const setup = () => render(<Footer />);

  it("footerが表示", () => {
    setup();
    expect(el("footer")).toBeTruthy();
  });

  it("LinkItems", () => {
    setup();
    // 制作者TwitterLink
    expect(el("twitterLink")).toHaveAttribute(
      "href",
      "https://twitter.com/k_kyube"
    );
  });
});
