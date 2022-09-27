import React from "react";
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { createMemoryHistory } from "history";
import { AuthContext } from "../../contexts/Auth";
import { PhotoGallery } from "../../containers/PhotoGallery";
import { photoGallery } from "../../urls";

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

const mockAxios = new MockAdapter(axios);
const returnData = {
  items: [
    {
      original: "/testurl",
      originalHeight: 512,
      originalWidth: 512,
    },
  ],
};

const returnEmptyData = {
  items: [],
};

const providerProps = {
  value: {
    currentUser: currentUser,
    setCurrentUser: jest.fn(),
  },
};

const customRender = (ui: JSX.Element, providerProps: IProviderProps) => {
  const history = createMemoryHistory();
  return render(
    <Router location={history.location} navigator={history}>
      <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>
    </Router>
  );
};

const el = screen.getByTestId;

afterEach(cleanup);

describe("PhotoGalleryコンポーネント", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });

  const setup = () => customRender(<PhotoGallery />, providerProps);

  describe("Itemがある場合", () => {
    it("PhotoGalleryが表示", async () => {
      mockAxios.onGet(photoGallery).reply(200, returnData);
      setup();
      await waitFor(() => {
        expect(el("photGallery")).toBeTruthy();
      });
    });
  });

  describe("Itemがない場合", () => {
    it("画像無しメッセージが表示", async () => {
      mockAxios.onGet(photoGallery).reply(200, returnEmptyData);
      setup();
      await waitFor(() => {
        expect(el("emptyMessage")).toBeTruthy();
      });
    });
  });
});
