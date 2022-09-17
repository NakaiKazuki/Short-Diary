import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

const el = screen.getByTestId;

afterEach(cleanup);
describe("App", () => {
  const setup = () => render(<App />);
  // eslint-disable-next-line testing-library/no-render-in-setup
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
