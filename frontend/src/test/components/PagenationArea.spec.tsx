import { render, cleanup } from "@testing-library/react";

import { PaginationArea } from "../../components/PaginationArea";
import { el } from "../helpers";

afterEach(cleanup);

const pagy = {
  page: 1,
  pages: 1,
};

describe("PaginationArea コンポーネント", () => {
  const setup = () =>
    render(<PaginationArea pagy={pagy} onPageChange={jest.fn()} />);

  it("Pagination欄がある", () => {
    setup();
    expect(el("paginationBar")).toBeTruthy();
  });
});
