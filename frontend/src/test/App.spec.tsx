import { render, cleanup } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { createObserver, el } from "./helpers";
import { HelmetProvider } from "react-helmet-async";
import App from "../App";

createObserver();
afterEach(cleanup);

const customRender = (ui: JSX.Element) => {
  render(<HelmetProvider>{ui}</HelmetProvider>);
};

describe("App", () => {
  const setup = () => customRender(<App />);
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
