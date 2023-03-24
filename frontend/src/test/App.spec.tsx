import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

const el = screen.getByTestId;

// IntersectionObserverのモックを作成
class IntersectionObserver {
  observe() {
    return null;
  }

  unobserve() {
    return null;
  }

  disconnect() {
    return null;
  }
}

// テスト実行前にwindowオブジェクトにIntersectionObserverを追加する
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

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
