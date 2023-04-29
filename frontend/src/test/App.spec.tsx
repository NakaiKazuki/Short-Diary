import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createResizeObserver,
  createIntersectionObserver,
  el,
} from "./helpers";
import { HelmetProvider } from "react-helmet-async";
import App from "../App";

createIntersectionObserver();
createResizeObserver();
afterEach(cleanup);

const customRender = (ui: JSX.Element) => {
  render(<HelmetProvider>{ui}</HelmetProvider>);
};

describe("App", () => {
  const setup = () => customRender(<App />);
  beforeEach(() => setup());

  describe("Before", () => {
    it("Loadコンポーネント", () => {
      expect(el("load")).toBeTruthy();
    });
  });

  describe("After", () => {
    it("Headerコンポーネント", () => {
      setTimeout(() => {
        expect(el("header")).toBeTruthy();
      }, 3000);
    });

    it("footerコンポーネント", () => {
      setTimeout(() => {
        expect(el("footer")).toBeTruthy();
      }, 3000);
    });

    // 以下クリックで開く系
    it("Contactコンポーネント", () => {
      setTimeout(async () => {
        await userEvent.click(el("contactButton"));
        expect(el("contact")).toBeTruthy();
      }, 3000);
    });
  });
});
