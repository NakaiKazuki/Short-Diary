import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Message } from "../../containers/Message";
import { MessageContext } from "../../contexts/Message";
import { el } from "../helpers";

// types
import { IMessageProviderProps as IProviderProps } from "../../types/test";

afterEach(cleanup);

const emptyMessage = {
  value: {
    message: undefined,
    setMessage: jest.fn(),
  },
};

const anyMessage = {
  value: {
    message: "testMessage",
    setMessage: jest.fn(),
  },
};

const customRender = (ui: JSX.Element, providerProps: IProviderProps) => {
  return render(
    <MessageContext.Provider {...providerProps}>{ui}</MessageContext.Provider>
  );
};

describe("Message", () => {
  it("非表示", () => {
    customRender(<Message />, emptyMessage);
    expect(screen.queryByTestId("message")).toBeNull();
  });

  it("表示", () => {
    customRender(<Message />, anyMessage);
    expect(el("message")).toBeTruthy();
  });
});
