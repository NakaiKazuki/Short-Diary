import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PagenationArea } from "../../components/PagenationArea";

const pagy = {
  page: 1,
  pages: 1,
};

const el = screen.getByTestId;

afterEach(cleanup);

describe("PagenationArea コンポーネント", () => {
  const setup = () =>
    render(<PagenationArea pagy={pagy} onPageChange={jest.fn()} />);

  it("Pagenation欄がある", () => {
    setup();
    expect(el("pagenationBar")).toBeTruthy();
  });
});
