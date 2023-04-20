import { render, cleanup } from "@testing-library/react";

import { PagenationArea } from "../../components/PagenationArea";
import { el } from "../helpers";

afterEach(cleanup);

const pagy = {
  page: 1,
  pages: 1,
};

describe("PagenationArea コンポーネント", () => {
  const setup = () =>
    render(<PagenationArea pagy={pagy} onPageChange={jest.fn()} />);

  it("Pagenation欄がある", () => {
    setup();
    expect(el("pagenationBar")).toBeTruthy();
  });
});
