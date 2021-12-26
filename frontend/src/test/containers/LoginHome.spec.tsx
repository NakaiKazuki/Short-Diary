import React from "react";
import "@testing-library/jest-dom";
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "../../contexts/Auth";
import { LoginHome } from "../../containers/LoginHome";
import { home, diary } from "../../urls";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const dateToday = new Date().toISOString().split("T")[0];

// Apiから返ってくるデータ
const returnData = {
  diaries: [
    {
      id: 1,
      date: dateToday,
      content: "Test Content",
      tag_list: [],
      picture_url: null,
      user_id: 1,
    },
    {
      id: 2,
      date: dateToday,
      content: "A123456789B123456789C123456789D123456789E123456789F123456789",
      tag_list: ["testTag1", "testTag2"],
      picture_url: "/testurl",
      user_id: 1,
    },
  ],
  pagy: {
    page: 1,
    pages: 1,
  },
};

// Apiから返ってくるエラーデータ
const returnErrorData = {
  errors: {
    date: ["date ApiError"],
    content: ["cotent ApiError"],
    picture: ["picture ApiError"],
    tag_list: ["tag_list ApiError"],
  },
};

// 正しいForm情報
const formInfo = [
  {
    testId: "dateArea",
    value: dateToday,
  },
  {
    testId: "contentArea",
    value: "testContent",
  },
];

const providerProps = {
  value: {
    currentUser: currentUser,
    setCurrentUser: jest.fn(),
  },
};

const mockAxios = new MockAdapter(axios);

// ApiResponseを設定
mockAxios.onGet(home).reply(200, returnData);

const customRender = (ui: JSX.Element, providerProps: IProviderProps) => {
  return render(
    <Router>
      <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>
    </Router>
  );
};

const idNames = ["date", "tag_list", "content", "picture"];

const el = screen.getByTestId;

afterEach(cleanup);

describe("LoginHome", () => {
  const setup = () => {
    customRender(<LoginHome />, providerProps);
  };

  it("日記一覧が表示", async () => {
    setup();
    await waitFor(() => expect(el("diaryIndex")).toBeTruthy());
  });

  it("PagenationBarが表示", async () => {
    setup();
    await waitFor(() => expect(el("pagenationBar")).toBeTruthy());
  });

  it("日記検索欄が表示", async () => {
    setup();
    // デフォルトは非表示
    const searchDrawer = screen.queryByTestId("searchDrawer");
    await waitFor(() => expect(searchDrawer).toBeNull());

    // ユーザがクリックすることで表示
    userEvent.click(el("drawerOpenButton"));
    await waitFor(() => expect(el("searchDrawer")).toBeTruthy());
    // 日付検索欄
    await waitFor(() => expect(el("dateSearchField")).toBeTruthy());
    // 単語検索欄
    await waitFor(() => expect(el("wordSearchField")).toBeTruthy());
    // 検索初期化ボタン
    await waitFor(() => expect(el("clearButton")).toBeTruthy());
  });

  describe("DiaryCreateDialog", () => {
    it("OpenButton", async () => {
      setup();
      await waitFor(() => {
        expect(el("diaryCreateOpenButton")).toContainElement(el("createIcon"));
      });
      await waitFor(() => {
        expect(el("diaryCreateOpenButton")).toHaveTextContent("日記作成");
      });
    });

    it("OpenButtonクリックで開く", async () => {
      setup();
      // Dialogを開く
      userEvent.click(el("diaryCreateOpenButton"));
      await waitFor(() => {
        expect(el("diaryCreateDialog")).toBeTruthy();
      });
    });

    it("DialogTitle", async () => {
      setup();
      // Dialogを開く
      userEvent.click(el("diaryCreateOpenButton"));
      await waitFor(() => {
        expect(el("diaryCreateDialog")).toContainElement(
          el("diaryCreateDialogTitle")
        );
      });
    });

    // it("データの作成に成功した場合Dialogを閉じる", async () => {
    //   setup();
    //   // ApiResponseを設定
    //   mockAxios.onPost(diary).reply(200, returnData);
    //   // Dialogを開く
    //   userEvent.click(el("diaryCreateOpenButton"));
    //   // 各項目に有効な値を入力
    //   formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));
    //   // ユーザが送信ボタンをクリック
    //   userEvent.click(el("formSubmit"));
    //   await waitFor(() =>
    //     expect(screen.queryByTestId("diaryCreateDialog")).toBeNull()
    //   );
    // });

    // it("データの作成に失敗した場合Dialogは閉じない", async () => {
    //   setup();
    //   // ApiResponseを設定
    //   mockAxios.onPost(diary).reply(422, returnErrorData);
    //   // Dialogを開く
    //   userEvent.click(el("diaryCreateOpenButton"));
    //   // 各項目に有効な値を入力
    //   formInfo.forEach((obj) => userEvent.clear(el(obj.testId)));
    //   // ユーザが送信ボタンをクリック
    //   userEvent.click(el("formSubmit"));
    //   await waitFor(() => expect(el("diaryCreateDialog")).toBeTruthy());
    // });

    // describe("Form欄", () => {
    //   it("各入力欄のブロックがある", () => {
    //     setup();
    //     userEvent.click(el("diaryCreateOpenButton"));
    //     idNames.forEach(async (idName) => {
    //       await waitFor(() =>
    //         expect(el("diaryForm")).toContainElement(el(`FormItem-${idName}`))
    //       );
    //     });
    //   });

    //   it("ErrorMessage", async () => {
    //     // ApiResponseを設定
    //     mockAxios.onPost(diary).reply(200, returnData);
    //     setup();
    //     userEvent.click(el("diaryCreateOpenButton"));

    //     // 各項目に無効な値を入力
    //     formInfo.forEach((obj) => userEvent.clear(el(obj.testId)));

    //     // ユーザが送信ボタンをクリック
    //     userEvent.click(el("formSubmit"));

    //     // エラーメッセージが表示(contentにのみ表示)
    //     await waitFor(() =>
    //       expect(el("FormItem-content")).toContainElement(
    //         el("contentErrorMessage")
    //       )
    //     );
    //   });

    //   it("APIErrorMessage", async () => {
    //     // ApiResponseを設定
    //     mockAxios.onPost(diary).reply(422, returnErrorData);
    //     setup();
    //     userEvent.click(el("diaryCreateOpenButton"));

    //     // 各項目に有効な値を入力
    //     formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));

    //     // ユーザが送信ボタンをクリック
    //     userEvent.click(el("formSubmit"));

    //     // 各項目に対応したApiからのエラーメッセージが表示
    //     idNames.forEach(
    //       async (idName) =>
    //         await waitFor(() =>
    //           expect(el(`FormItem-${idName}`)).toContainElement(
    //             el(`${idName}ApiError`)
    //           )
    //         )
    //     );
    //   });

    //   describe("入力欄", () => {
    //     it("入力欄初期値", async () => {
    //       act(() => setup());
    //       userEvent.click(el("diaryCreateOpenButton"));
    //       // date
    //       await waitFor(() => expect(el("dateArea")).toHaveValue(dateToday));
    //       // tag_list
    //       await waitFor(() => expect(el("tag_listArea")).toHaveValue(""));
    //       // content
    //       await waitFor(() => expect(el("contentArea")).toHaveValue(""));
    //       // picture
    //       await waitFor(() => expect(el("pictureArea")).toHaveValue(""));
    //     });

    //     it("content欄は入力した文字数が表示", async () => {
    //       setup();
    //       userEvent.click(el("diaryCreateOpenButton"));
    //       const testContent = "testContent";
    //       userEvent.type(el("contentArea"), testContent);
    //       await waitFor(() =>
    //         expect(el("contentCount")).toHaveTextContent(
    //           `${testContent.length}/200`
    //         )
    //       );
    //     });
    //   });

    //   describe("送信ボタン", () => {
    //     it("送信ボタンがある", async () => {
    //       setup();
    //       userEvent.click(el("diaryCreateOpenButton"));
    //       await waitFor(() =>
    //         expect(el("formSubmit")).toHaveAttribute("type", "submit")
    //       );
    //       await waitFor(() =>
    //         expect(el("formSubmit")).toHaveTextContent("日記作成")
    //       );
    //     });

    //     it("送信状況によってボタンが変化 Status422", async () => {
    //       setup();
    //       userEvent.click(el("diaryCreateOpenButton"));
    //       // ApiResponse
    //       mockAxios.onPost(diary).reply(422, returnErrorData);

    //       // 各項目に有効な値を入力
    //       formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));

    //       // 初期値
    //       await waitFor(() =>
    //         expect(el("formSubmit")).toHaveTextContent("日記作成")
    //       );
    //       await waitFor(() => expect(el("formSubmit")).not.toBeDisabled());

    //       // ユーザが送信ボタンをクリック
    //       userEvent.click(el("formSubmit"));

    //       // APIからエラーが返ってくると初期値に戻る
    //       await waitFor(() =>
    //         expect(el("formSubmit")).toHaveTextContent("日記作成")
    //       );
    //       await waitFor(() => expect(el("formSubmit")).not.toBeDisabled());
    //     });
    //   });
    // });
  });

  // describe("DiaryDialog", () => {
  //   it("日記をクリックすると表示", async () => {
  //     setup();
  //     userEvent.click(await screen.findByTestId("diary-0"));
  //     expect(await screen.findByTestId("diaryDialog")).toBeTruthy();
  //   });

  //   it("初期値(タグ無し, 画像無し)", async () => {
  //     setup();
  //     // 日記データをクリック
  //     userEvent.click(await screen.findByTestId("diary-0"));
  //     // MenuIconが表示
  //     expect(await screen.findByTestId("menuIcon")).toBeTruthy();
  //     // 日付が表示
  //     expect(await screen.findByTestId("diaryDate")).toHaveTextContent(
  //       returnData.diaries[0].date
  //     );
  //     // タグが空配列なら表示しない
  //     await waitFor(() =>
  //       expect(screen.queryByTestId("diaryTag-0")).toBeNull()
  //     );
  //     // 日記内容が表示
  //     expect(await screen.findByTestId("diaryContent")).toHaveTextContent(
  //       returnData.diaries[0].content
  //     );
  //     // 画像がない場合は表示しない
  //     await waitFor(() =>
  //       expect(screen.queryByTestId("diaryPicture")).toBeNull()
  //     );
  //   });

  //   it("初期値(タグあり, 画像あり)", async () => {
  //     setup();
  //     // 日記データをクリック
  //     userEvent.click(await screen.findByTestId("diary-1"));
  //     // MenuIconが表示
  //     expect(await screen.findByTestId("menuIcon")).toBeTruthy();
  //     // タグがあれば表示
  //     returnData.diaries[0].tag_list.forEach(async (tag, index) => {
  //       expect(
  //         await screen.findByTestId(`diaryTag-${index}`)
  //       ).toHaveTextContent(tag);
  //     });
  //     // 日付が表示
  //     expect(await screen.findByTestId("diaryDate")).toHaveTextContent(
  //       returnData.diaries[1].date
  //     );
  //     // 日記内容が表示
  //     expect(await screen.findByTestId("diaryContent")).toHaveTextContent(
  //       returnData.diaries[1].content
  //     );
  //     // 画像があれば表示
  //     expect(await screen.findByTestId("diaryPicture")).toBeTruthy();
  //   });

  //   it("MenuBarの編集クリックで編集用画面に変更", async () => {
  //     setup();
  //     // 日記データを開く
  //     userEvent.click(await screen.findByTestId("diary-0"));
  //     // メニューを開く
  //     userEvent.click(await screen.findByTestId("menuIcon"));
  //     // 編集をクリック
  //     userEvent.click(await screen.findByTestId("MenuItemDiaryEdit"));
  //     expect(await screen.findByTestId("diaryEditTitle")).toHaveTextContent(
  //       "日記編集"
  //     );
  //   });

  //   it("MenuBarの削除クリックで確認用Dialog表示", async () => {
  //     setup();
  //     // 日記データを開く
  //     userEvent.click(await screen.findByTestId("diary-0"));
  //     // メニューを開く
  //     userEvent.click(await screen.findByTestId("menuIcon"));
  //     // 削除をクリック
  //     userEvent.click(await screen.findByTestId("MenuItemDiaryDelete"));
  //     expect(await screen.findByTestId("confirmDialog")).toBeTruthy();
  //   });

  //   // describe("DiaryEdit", () => {
  //   //   it("各入力欄のブロックがある", async () => {
  //   //     setup();
  //   //     userEvent.click(await screen.findByTestId("diary-0"));
  //   //     userEvent.click(await screen.findByTestId("MenuItemDiaryEdit"));
  //   //     idNames.forEach(async (idName) => {
  //   //       expect(await screen.findByTestId("diaryForm")).toContainElement(
  //   //         await screen.findByTestId(`FormItem-${idName}`)
  //   //       );
  //   //     });
  //   //   });

  //   //   it("ErrorMessage", async () => {
  //   //     setup();
  //   //     userEvent.click(await screen.findByTestId("diary-0"));
  //   //     userEvent.click(await screen.findByTestId("MenuItemDiaryEdit"));
  //   //     // ApiResponseを設定
  //   //     mockAxios
  //   //       .onPatch(`${diary}/${returnData.diaries[0].id}`)
  //   //       .reply(200, returnData);

  //   //     // 各項目に無効な値を入力
  //   //     formInfo.forEach(async (obj) =>
  //   //       userEvent.clear(await screen.findByTestId(obj.testId))
  //   //     );
  //   //     // ユーザが送信ボタンをクリック
  //   //     userEvent.click(await screen.findByTestId("formSubmit"));

  //   //     // エラーメッセージが表示(contentにのみ表示
  //   //     expect(await screen.findByTestId("FormItem-content")).toContainElement(
  //   //       await screen.findByTestId("contentErrorMessage")
  //   //     );
  //   //   });

  //   // it("APIErrorMessage", async () => {
  //   //   setup();
  //   //   userEvent.click(await screen.findByTestId("diary-0"));
  //   //   userEvent.click(await screen.findByTestId("MenuItemDiaryEdit"));
  //   //   // ApiResponseを設定
  //   //   mockAxios
  //   //     .onPatch(`${diary}/${returnData.diaries[0].id}`)
  //   //     .reply(422, returnErrorData);

  //   //   // 各項目に有効な値を入力
  //   //   formInfo.forEach(async (obj) =>
  //   //     userEvent.type(await screen.findByTestId(obj.testId), obj.value)
  //   //   );

  //   //   // ユーザが送信ボタンをクリック
  //   //   // 各項目に対応したApiからのエラーメッセージが表示
  //   //   await waitFor(() =>
  //   //     idNames.forEach((idName) =>
  //   //       expect(
  //   //         el(`FormItem-${idName}`)
  //   //       ).toContainElement(el(`${idName}ApiError`))
  //   //     )
  //   //   );
  //   // });

  //   //   describe("入力欄", () => {
  //   //     it("入力欄初期値", async () => {
  //   //       setup();
  //   //       userEvent.click(await screen.findByTestId("diary-0"));
  //   //       userEvent.click(await screen.findByTestId("MenuItemDiaryEdit"));
  //   //       // date
  //   //       expect(await screen.findByTestId("dateArea")).toHaveValue(
  //   //         returnData.diaries[0].date
  //   //       );
  //   //       // tag_list
  //   //       expect(await screen.findByTestId("tag_listArea")).toHaveValue(
  //   //         returnData.diaries[0].tag_list.join(",")
  //   //       );
  //   //       // content
  //   //       expect(await screen.findByTestId("contentArea")).toHaveValue(
  //   //         returnData.diaries[0].content
  //   //       );
  //   //       // picture
  //   //       expect(await screen.findByTestId("pictureArea")).toHaveValue("");
  //   //     });

  //   //     it("content欄は入力した文字数が表示", async () => {
  //   //       setup();
  //   //       userEvent.click(await screen.findByTestId("diary-0"));
  //   //       userEvent.click(await screen.findByTestId("MenuItemDiaryEdit"));
  //   //       expect(await screen.findByTestId("contentCount")).toHaveTextContent(
  //   //         `${returnData.diaries[0].content.length}/200`
  //   //       );
  //   //     });
  //   //   });

  //   //   describe("送信ボタン", () => {
  //   //     it("送信ボタンがある", async () => {
  //   //       setup();
  //   //       userEvent.click(await screen.findByTestId("diary-0"));
  //   //       userEvent.click(await screen.findByTestId("MenuItemDiaryEdit"));
  //   //       expect(await screen.findByTestId("formSubmit")).toHaveAttribute(
  //   //         "type",
  //   //         "submit"
  //   //       );
  //   //       expect(await screen.findByTestId("formSubmit")).toHaveTextContent(
  //   //         "日記編集"
  //   //       );
  //   //     });

  //   //     it("送信状況によってボタンが変化 Status422", async () => {
  //   //       setup();
  //   //       // ApiResponse
  //   //       mockAxios
  //   //         .onPatch(`${diary}/${returnData.diaries[0].id}`)
  //   //         .reply(422, returnErrorData);

  //   //       // 各項目に有効な値を入力
  //   //       formInfo.forEach((obj) => userEvent.type(el(obj.testId), obj.value));

  //   //       // 初期値
  //   //       expect(await screen.findByTestId("formSubmit")).toHaveTextContent(
  //   //         "日記編集"
  //   //       );
  //   //       expect(await screen.findByTestId("formSubmit")).not.toBeDisabled();

  //   //       // ユーザが送信ボタンをクリック
  //   //       userEvent.click(el("formSubmit"));

  //   //       // APIからエラーが返ってくると初期値に戻る
  //   //       expect(await screen.findByTestId("formSubmit")).toHaveTextContent(
  //   //         "日記編集"
  //   //       );
  //   //       expect(await screen.findByTestId("formSubmit")).not.toBeDisabled();
  //   //     });
  //   //   });
  //   // });

  //   // describe("ConfirmDilog", () => {
  //   //   it("確認用Dialogが表示、MenuBarは見えなくなる", async () => {
  //   //     setup();
  //   //     // 日記データを開く
  //   //     userEvent.click(await screen.findByTestId("diary-0"));
  //   //     // メニューを開く
  //   //     userEvent.click(await screen.findByTestId("menuIcon"));
  //   //     // 削除をクリック
  //   //     userEvent.click(await screen.findByTestId("MenuItemDiaryDelete"));
  //   //     expect(await screen.findByTestId("confirmDialog")).toBeTruthy();
  //   //     expect(await screen.findByTestId("diaryMenuBar")).toHaveStyle(
  //   //       "visibility: hidden"
  //   //     );
  //   //   });

  //   //   it("削除クリックで全てConfirmDialogとDiaryDialogを閉じる", async () => {
  //   //     setup();
  //   //     // 日記データを開く
  //   //     userEvent.click(await screen.findByTestId("diary-0"));
  //   //     // メニューを開く
  //   //     userEvent.click(await screen.findByTestId("menuIcon"));
  //   //     // 削除をクリック
  //   //     userEvent.click(await screen.findByTestId("MenuItemDiaryDelete"));
  //   //     mockAxios
  //   //       .onDelete(`${diary}/${returnData.diaries[0].id}`)
  //   //       .reply(200, returnData);
  //   //     // 削除をクリック
  //   //     userEvent.click(await screen.findByTestId("deleteButton"));

  //   //     await waitFor(() =>
  //   //       expect(screen.queryByTestId("diaryDialog")).toBeNull()
  //   //     );
  //   //     await waitFor(() =>
  //   //       expect(screen.queryByTestId("confirmDialog")).toBeNull()
  //   //     );
  //   //   });
  //   // });
  // });
});
