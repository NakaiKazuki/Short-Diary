import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { Section } from "../../components/Section";
import testPicture from "../../images/sample/diary.png";

const el = screen.getByTestId;
afterEach(cleanup);

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

describe("Section コンポーネント", () => {
  const setup = () =>
    render(
      <Section>
        <img src={testPicture} />
      </Section>
    );

  it("Pagenation欄がある", () => {
    setup();
    expect(el("section")).toBeTruthy();
  });
});
