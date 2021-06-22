import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { UserMenu } from "../../../components/users";
import { createMemoryHistory } from "history";
import { AuthContext } from "../../../contexts/Auth";
// 型
interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface IData {
  id: number;
  name: string;
  email: string;
}

interface ICurrentUser {
  data: IData;
  headers: IHeaders;
}

interface IProviderProps {
  value: {
    currentUser: ICurrentUser | undefined;
    setCurrentUser: jest.Mock<React.Dispatch<React.SetStateAction<undefined>>>;
  };
}

// ユーザデータ
const currentUser = {
  headers: {
    "access-token": "testtoken",
    client: "testclient",
    uid: "test@example.com",
  },
  data: {
    id: 1,
    name: "test",
    email: "test@example.com",
  },
};

const providerProps = {
  value: {
    currentUser: currentUser,
    setCurrentUser: jest.fn(),
  },
};

const el = screen.getByTestId;

const customRender = (
  ui: JSX.Element,
  { providerProps }: { providerProps: IProviderProps }
) => {
  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>
    </Router>
  );
};

afterEach(cleanup);

describe("UserMenu コンポーネント", () => {
  beforeEach(() => {
    customRender(
      <UserMenu
        anchorEl={null}
        currentUserName={currentUser.data.name}
        onMenuOpen={jest.fn()}
        onMenuClose={jest.fn()}
        onSignOut={jest.fn()}
      />,
      { providerProps }
    );
  });

  it("UserWrapper", () => {
    const userWrapper = el("userWrapper");
    // UserIconが表示
    expect(userWrapper).toContainElement(el("userIcon"));
    // UserNameが表示
    expect(userWrapper).toContainElement(el("userName"));
  });

  it("メニューは基本非表示", () => {
    expect(el("menuBar")).toHaveStyle("visibility: hidden");
  });

  it("メニュー項目", () => {
    const menuBar = el("menuBar");

    // ユーザ情報編集リンク
    expect(menuBar).toContainElement(el("userEditLink"));

    // ログアウトボタン
    expect(menuBar).toContainElement(el("logoutButton"));
  });
});
