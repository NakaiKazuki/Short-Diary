import { render, screen, cleanup } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { Message } from "../../utils/Message";
import { messageAtom } from "../../atoms";
import { el } from "../helpers";

afterEach(cleanup);

const customRender = (ui: JSX.Element, message: undefined | string) => {
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(messageAtom, message);
      }}
    >
      {ui}
    </RecoilRoot>
  );
};

describe("Message", () => {
  it("非表示", () => {
    customRender(<Message />, undefined);
    expect(screen.queryByTestId("message")).toBeNull();
  });

  it("表示", () => {
    customRender(<Message />, "testMessage");
    expect(el("message")).toBeTruthy();
  });
});
