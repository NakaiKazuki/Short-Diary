import { screen } from "@testing-library/react";
export const el = screen.getByTestId;

// IntersectionObserverのモックを作成
export const createObserver = (): void => {
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
};
export const testString = (count: number): string => {
  return "0123456789".repeat(count);
};
