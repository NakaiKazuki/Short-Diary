import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { createObserver, el } from "./helpers";
import App from "../App";

createObserver();
afterEach(cleanup);

describe("App", () => {
  const setup = () => render(<App />);
  beforeEach(() => setup());
  it("Headerコンポーネント", () => {
    expect(el("header")).toBeTruthy();
  });

  it("footerコンポーネント", () => {
    expect(el("footer")).toBeTruthy();
  });

  // 以下クリックで開く系
  it("Contactコンポーネント", async () => {
    await userEvent.click(el("contactButton"));
    expect(el("contact")).toBeTruthy();
  });
});
