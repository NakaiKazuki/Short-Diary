import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Message } from "../../containers/Message";
import { MessageContext } from "../../contexts/Message";

// 型
interface IProviderProps {
  value: {
    message: string | undefined;
    setMessage: jest.Mock<
      React.Dispatch<React.SetStateAction<string | undefined>>
    >;
  };
}

const el = screen.getByTestId;

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

afterEach(cleanup);

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
