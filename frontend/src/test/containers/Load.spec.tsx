import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Load } from "../../containers/Load";
import { createIntersectionObserver, el } from "../helpers";

afterEach(cleanup);
createIntersectionObserver();

describe("Looad コンポーネント", () => {
  const setup = () => render(<Load />);

  it("要素の確認", () => {
    setup();
    expect(el("load")).toContainElement(el("title"));
  });
});
