import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

const el = screen.getByTestId;

afterEach(cleanup);
describe("App", () => {
  const setup = () => render(<App />);

  it("Headerコンポーネント", () => {
    setup();
    expect(el("header")).toBeTruthy();
  });

  it("footerコンポーネント", () => {
    setup();
    expect(el("footer")).toBeTruthy();
  });
});
