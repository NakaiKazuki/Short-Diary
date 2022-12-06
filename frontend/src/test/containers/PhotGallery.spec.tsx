import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { PhotoGallery } from "../../containers/PhotoGallery";
import { photoGallery } from "../../urls";

interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface ICurrentUser {
  id: number;
  name: string;
  email: string;
}

interface IProviderProps {
  value: {
    currentUser: ICurrentUser | undefined;
    headers: IHeaders | undefined;
    setCurrentUser: jest.Mock<React.Dispatch<React.SetStateAction<undefined>>>;
    setHeaders: jest.Mock<React.Dispatch<React.SetStateAction<undefined>>>;
  };
}

// ユーザデータ
const headers = {
  "access-token": "testtoken",
  client: "testclient",
  uid: "test@example.com",
};

const currentUser = {
  id: 1,
  name: "test",
  email: "test@example.com",
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
    headers: headers,
    currentUser: currentUser,
    setCurrentUser: jest.fn(),
    setHeaders: jest.fn(),
  },
};

const customRender = (ui: JSX.Element, providerProps: IProviderProps) => {
  const routes = [
    {
      path: "/photoGalley",
      element: (
        <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>
      ),
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/photoGalley"],
  });
  return render(<RouterProvider router={router} />);
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
