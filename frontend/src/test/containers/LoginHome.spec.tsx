import React from "react";
import "@testing-library/jest-dom";
import { screen, cleanup, waitFor, render, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { LoginHome } from "../../containers/LoginHome";
import { home, diary } from "../../urls";
import { dateToday } from "../../helpers";
// 型

interface ICurrentUser {
  id: number;
  name: string;
  email: string;
}

interface IProviderProps {
  value: {
    currentUser: ICurrentUser | undefined;
    setCurrentUser: jest.Mock<React.Dispatch<React.SetStateAction<undefined>>>;
  };
}

// ユーザデータ
const currentUser = {
  id: 1,
  name: "test",
  email: "test@example.com",
};

const testString = (count: number): string => {
  return "0123456789".repeat(count);
};
// Apiから返ってくるデータ
const result = {
  diaries: [
    {
      id: 1,
      date: dateToday(),
      content: "Test Content",
      tag_list: [],
      movie_source: "",
      picture_url: null,
      user_id: 1,
    },
    {
      id: 2,
      date: dateToday(),
      content: testString(6),
      tag_list: ["testTag1", "testTag2"],
      movie_source: "https://www.youtube.com/watch?v=vDA-9eicKSM",
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
const resultError = {
  errors: {
    date: ["date ApiError"],
    content: ["cotent ApiError"],
    picture: ["picture ApiError"],
    movie_source: ["movie_source ApiError"],
    tag_list: ["tag_list ApiError"],
  },
};

// 正しいForm情報
const formInfo = [
  {
    testId: "dateArea",
    value: dateToday(),
  },
  {
    testId: "contentArea",
    value: "testContent",
  },
  {
    testId: "movie_sourceArea",
    value: "testmovie_source",
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
mockAxios.onGet(home).reply(200, result);

const customRender = (ui: JSX.Element, providerProps: IProviderProps) => {
  const routes = [
    {
      path: "/",
      element: (
        <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>
      ),
    },
  ];
  const router = createMemoryRouter(routes);
  return render(<RouterProvider router={router} />);
};

const idNames = ["date", "tag_list", "content", "movie_source", "picture"];

const el = screen.getByTestId;

afterEach(() => {
  cleanup;
});
describe("LoginHome", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });

  const setup = () => {
    customRender(<LoginHome />, providerProps);
  };
  beforeEach(
    async () =>
      await act(async () => {
        setup();
      })
  );

  it("日記一覧が表示", async () => {
    await waitFor(() => expect(el("diaryIndex")).toBeTruthy());
  });

  it("PagenationBarが表示", () => {
    expect(el("pagenationBar")).toBeTruthy();
  });

  it("日記検索欄が表示", async () => {
    // // デフォルトは非表示
    // const searchDrawer = screen.queryByTestId("searchDrawer");

    // ユーザがクリックすることで表示
    await userEvent.click(el("drawerOpenButton"));
    expect(el("searchDrawer")).toBeTruthy();
    // 日付検索欄
    expect(el("dateSearchField")).toBeTruthy();
    // 単語検索欄
    expect(el("wordSearchField")).toBeTruthy();
    // 検索初期化ボタ
    expect(el("clearButton")).toBeTruthy();
  });

  describe("DiaryCreateDialog", () => {
    it("OpenButton", () => {
      expect(el("diaryCreateOpenButton")).toContainElement(el("createIcon"));

      expect(el("diaryCreateOpenButton")).toHaveTextContent("日記作成");
    });

    it("OpenButtonクリックで開く", async () => {
      // Dialogを開く
      expect(screen.queryByTestId("diaryCreateDialog")).toBeNull();
      await userEvent.click(el("diaryCreateOpenButton"));
      expect(el("diaryCreateDialog")).toBeTruthy();
    });

    it("DialogTitle", async () => {
      // Dialogを開く
      await userEvent.click(el("diaryCreateOpenButton"));
      expect(el("diaryCreateDialog")).toContainElement(
        el("diaryCreateDialogTitle")
      );
    });

    it("データの作成に成功した場合Dialogを閉じる", async () => {
      // ApiResponseを設定
      mockAxios.onPost(diary).reply(200, result);
      // Dialogを開く
      await userEvent.click(el("diaryCreateOpenButton"));
      // 各項目に有効な値を入力
      await userEvent.type(el(formInfo[1].testId), formInfo[1].value);
      // ユーザが送信ボタンをクリック
      await userEvent.click(el("formSubmit"));
      await waitFor(() =>
        expect(screen.queryByTestId("diaryCreateDialog")).toBeNull()
      );
    });

    it("データの作成に失敗した場合Dialogは閉じない", async () => {
      // ApiResponseを設定
      mockAxios.onPost(diary).reply(422, resultError);
      // Dialogを開く
      await userEvent.click(el("diaryCreateOpenButton"));
      // 各項目に無効な値を入力
      await userEvent.clear(el(formInfo[1].testId));
      // ユーザが送信ボタンをクリック
      await userEvent.click(el("formSubmit"));
      await waitFor(() => expect(el("diaryCreateDialog")).toBeTruthy());
    });

    describe("Form欄", () => {
      beforeEach(async () => {
        await userEvent.click(el("diaryCreateOpenButton"));
      });

      it("各入力欄のブロックがある", () => {
        expect(el("diaryForm")).toContainElement(el(`FormItem-${idNames[0]}`));
        expect(el("diaryForm")).toContainElement(el(`FormItem-${idNames[1]}`));
        expect(el("diaryForm")).toContainElement(el(`FormItem-${idNames[2]}`));
        expect(el("diaryForm")).toContainElement(el(`FormItem-${idNames[3]}`));
        expect(el("diaryForm")).toContainElement(el(`FormItem-${idNames[4]}`));
      });

      it("ErrorMessage", async () => {
        // ApiResponseを設定
        mockAxios.onPost(diary).reply(200, result);

        // 各項目に無効な値を入力
        await userEvent.clear(el(formInfo[0].testId));
        await userEvent.clear(el(formInfo[1].testId));
        await userEvent.type(el(formInfo[2].testId), testString(26));

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // エラーメッセージが表示(content movie_source のみ表示)
        await waitFor(() => {
          expect(el("FormItem-content")).toContainElement(
            el("contentErrorMessage")
          );
        });

        await waitFor(() => {
          expect(el("FormItem-movie_source")).toContainElement(
            el("movie_sourceErrorMessage")
          );
        });
      });

      it("APIErrorMessage", async () => {
        // ApiResponseを設定
        mockAxios.onPost(diary).reply(422, resultError);

        // 各項目に有効な値を入力
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);
        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // 各項目に対応したApiからのエラーメッセージが表示
        await waitFor(() =>
          expect(el(`FormItem-${idNames[0]}`)).toContainElement(
            el(`${idNames[0]}ApiError`)
          )
        );
        await waitFor(() =>
          expect(el(`FormItem-${idNames[1]}`)).toContainElement(
            el(`${idNames[1]}ApiError`)
          )
        );
        await waitFor(() =>
          expect(el(`FormItem-${idNames[2]}`)).toContainElement(
            el(`${idNames[2]}ApiError`)
          )
        );
        await waitFor(() =>
          expect(el(`FormItem-${idNames[3]}`)).toContainElement(
            el(`${idNames[3]}ApiError`)
          )
        );

        await waitFor(() =>
          expect(el(`FormItem-${idNames[4]}`)).toContainElement(
            el(`${idNames[4]}ApiError`)
          )
        );
      });

      describe("入力欄", () => {
        it("入力欄初期値", () => {
          // date
          expect(el("dateArea")).toHaveValue(dateToday());
          // tag_list
          expect(el("tag_listArea")).toHaveValue("");
          // content
          expect(el("contentArea")).toHaveValue("");
          // picture
          expect(el("pictureArea")).toHaveValue("");
          // movie_source
          expect(el("movie_sourceArea")).toHaveValue("");
        });

        it("content欄は入力した文字数が表示", async () => {
          await userEvent.clear(el("contentArea"));
          await waitFor(() =>
            expect(el("contentCount")).toHaveTextContent("0/200")
          );
        });
      });

      describe("送信ボタン", () => {
        it("送信ボタンがある", () => {
          expect(el("formSubmit")).toHaveAttribute("type", "submit");
          expect(el("formSubmit")).toHaveTextContent("日記作成");
        });

        it("送信結果によってボタンが変化 Status422", async () => {
          // ApiResponse
          mockAxios.onPost(diary).reply(422, resultError);

          // 各項目に有効な値を入力
          await userEvent.type(el(formInfo[1].testId), formInfo[1].value);

          // 初期値
          expect(el("formSubmit")).toHaveTextContent("日記作成");
          expect(el("formSubmit")).not.toBeDisabled();

          // ユーザが送信ボタンをクリック
          await userEvent.click(el("formSubmit"));

          // APIからエラーが返ってくると初期値に戻る
          await waitFor(() =>
            expect(el("formSubmit")).toHaveTextContent("日記作成")
          );
          await waitFor(() => expect(el("formSubmit")).not.toBeDisabled());
        });
      });
    });
  });

  describe("DiaryDialog", () => {
    beforeEach(async () => {
      await userEvent.click(el("diary-0"));
    });

    it("日記をクリックすると表示", () => {
      expect(el("diaryDialog")).toBeTruthy();
    });

    it("menuOpenIconがある", () => {
      expect(el("menuOpenIcon")).toBeTruthy();
    });

    it("初期値(タグ無し, 画像無し)", () => {
      // menuOpenIconが表示
      expect(el("menuOpenIcon")).toBeTruthy();
      // 日付が表示
      expect(el("diaryDate")).toHaveTextContent(result.diaries[0].date);
      // タグが空配列なら表示しない
      expect(screen.queryByTestId("diaryTag-0")).toBeNull();
      // 日記内容が表示

      expect(el("diaryContent")).toHaveTextContent(result.diaries[0].content);

      // 画像がない場合は表示しない
      expect(screen.queryByTestId("diaryPicture")).toBeNull();
    });

    it("MenuBarの編集クリックで編集用画面に変更", async () => {
      // メニューを開く
      await userEvent.click(el("menuOpenIcon"));
      // 編集をクリック
      await userEvent.click(el("MenuItemDiaryEdit"));
      expect(el("diaryEditTitle")).toHaveTextContent("日記編集");
    });

    it("MenuBarの削除クリックで確認用Dialog表示", async () => {
      // メニューを開く
      await userEvent.click(el("menuOpenIcon"));
      // 削除をクリック
      await userEvent.click(el("MenuItemDiaryDelete"));
      expect(el("confirmDialog")).toBeTruthy();
    });

    describe("メニューバー(閲覧時)", () => {
      it("メニューバーは基本非表示", () => {
        expect(screen.queryByTestId("diaryMenuBar")).toBeNull();
      });

      describe("メニュー項目", () => {
        beforeEach(async () => {
          await userEvent.click(el("menuOpenIcon"));
        });

        it("編集ボタン", () => {
          // 編集に変更ボタン
          expect(el("diaryMenuBar")).toContainElement(el("MenuItemDiaryEdit"));
          // Icon
          expect(el("MenuItemDiaryEdit")).toContainElement(el("editIcon"));
          // Text
          expect(el("MenuItemDiaryEdit")).toHaveTextContent("編集");
        });

        it("削除ボタン", () => {
          expect(el("diaryMenuBar")).toContainElement(
            el("MenuItemDiaryDelete")
          );
          // Icon
          expect(el("MenuItemDiaryDelete")).toContainElement(el("deleteIcon"));
          // Text
          expect(el("MenuItemDiaryDelete")).toHaveTextContent("削除");
        });
      });
    });

    describe("DiaryEdit", () => {
      beforeEach(async () => {
        // メニューを開く
        await userEvent.click(el("menuOpenIcon"));
        // 編集をクリック
        await userEvent.click(el("MenuItemDiaryEdit"));
      });

      it("メニューバー(編集時)", async () => {
        await userEvent.click(el("menuOpenIcon"));
        // 閲覧に変更ボタン
        expect(el("diaryMenuBar")).toContainElement(el("MenuItemDiaryShow"));
        // 削除ボタン
        expect(el("diaryMenuBar")).toContainElement(el("MenuItemDiaryDelete"));
      });

      it("各入力欄のブロックがある", () => {
        expect(el("diaryForm")).toContainElement(el(`FormItem-${idNames[0]}`));
        expect(el("diaryForm")).toContainElement(el(`FormItem-${idNames[1]}`));
        expect(el("diaryForm")).toContainElement(el(`FormItem-${idNames[2]}`));
        expect(el("diaryForm")).toContainElement(el(`FormItem-${idNames[3]}`));
        expect(el("diaryForm")).toContainElement(el(`FormItem-${idNames[4]}`));
      });

      it("エラーメッセージ", async () => {
        // ApiResponseを設定
        mockAxios
          .onPatch(`${diary}/${result.diaries[0].id}`)
          .reply(200, result);

        // 無効な値を入力
        await userEvent.clear(el(formInfo[1].testId));
        await userEvent.type(el(formInfo[2].testId), testString(26));

        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));

        // エラーメッセージが表示(content movie_sourceにのみ表示
        await waitFor(() => {
          expect(el("FormItem-content")).toContainElement(
            el("contentErrorMessage")
          );
        });

        await waitFor(() => {
          expect(el("FormItem-movie_source")).toContainElement(
            el("movie_sourceErrorMessage")
          );
        });
      });

      it("APIエラーメッセージ", async () => {
        // ApiResponseを設定
        mockAxios
          .onPatch(`${diary}/${result.diaries[0].id}`)
          .reply(422, resultError);

        // 値を入力
        await userEvent.type(el(formInfo[1].testId), formInfo[1].value);
        // ユーザが送信ボタンをクリック
        await userEvent.click(el("formSubmit"));
        // 各項目に対応したApiからのエラーメッセージが表示
        await waitFor(() =>
          expect(el(`FormItem-${idNames[0]}`)).toContainElement(
            el(`${idNames[0]}ApiError`)
          )
        );
        await waitFor(() =>
          expect(el(`FormItem-${idNames[1]}`)).toContainElement(
            el(`${idNames[1]}ApiError`)
          )
        );
        await waitFor(() =>
          expect(el(`FormItem-${idNames[2]}`)).toContainElement(
            el(`${idNames[2]}ApiError`)
          )
        );
        await waitFor(() =>
          expect(el(`FormItem-${idNames[3]}`)).toContainElement(
            el(`${idNames[3]}ApiError`)
          )
        );
        await waitFor(() =>
          expect(el(`FormItem-${idNames[4]}`)).toContainElement(
            el(`${idNames[4]}ApiError`)
          )
        );
      });

      describe("入力欄", () => {
        it("入力欄初期値", () => {
          // date
          expect(el("dateArea")).toHaveValue(result.diaries[0].date);
          // tag_list
          expect(el("tag_listArea")).toHaveValue(
            result.diaries[0].tag_list.join(",")
          );
          // content
          expect(el("contentArea")).toHaveValue(result.diaries[0].content);
          // movie_source
          expect(el("movie_sourceArea")).toHaveValue(
            result.diaries[0].movie_source
          );
          // picture
          expect(el("pictureArea")).toHaveValue("");
        });

        it("content欄は入力した文字数が表示", () => {
          expect(el("contentCount")).toHaveTextContent(
            `${result.diaries[0].content.length}/200`
          );
        });
      });

      describe("送信ボタン", () => {
        it("送信ボタンがある", () => {
          expect(el("formSubmit")).toHaveAttribute("type", "submit");

          expect(el("formSubmit")).toHaveTextContent("日記編集");
        });

        it("送信結果によってボタンが変化 Status422", async () => {
          // ApiResponse
          mockAxios
            .onPatch(`${diary}/${result.diaries[0].id}`)
            .reply(422, resultError);

          // 有効な値を入力
          await userEvent.type(el(formInfo[1].testId), formInfo[1].value);
          // 初期値
          expect(el("formSubmit")).toHaveTextContent("日記編集");

          expect(el("formSubmit")).not.toBeDisabled();

          // ユーザが送信ボタンをクリック
          await userEvent.click(el("formSubmit"));

          // APIからエラーが返ってくると初期値に戻る
          await waitFor(() =>
            expect(el("formSubmit")).toHaveTextContent("日記編集")
          );
          await waitFor(() => expect(el("formSubmit")).not.toBeDisabled());
        });
      });
    });

    describe("ConfirmDilog", () => {
      beforeEach(async () => {
        mockAxios
          .onDelete(`${diary}/${result.diaries[0].id}`)
          .reply(200, result);
        // メニューを開く
        await userEvent.click(el("menuOpenIcon"));
        // 削除をクリック
        await userEvent.click(el("MenuItemDiaryDelete"));
      });

      it("確認用Dialogが表示、MenuBarは見えなくなる", async () => {
        expect(el("confirmDialog")).toBeTruthy();
        await waitFor(() =>
          expect(screen.queryByTestId("diaryMenuBar")).toBeNull()
        );
      });

      it("削除クリックでConfirmDialogとDiaryDialogを閉じる", async () => {
        await userEvent.click(el("deleteButton"));
        await waitFor(() =>
          expect(screen.queryByTestId("diaryDialog")).toBeNull()
        );
        await waitFor(() =>
          expect(screen.queryByTestId("confirmDialog")).toBeNull()
        );
      });
    });

    it("DiaryDialog初期値(タグあり, 画像あり, 動画urlあり)", async () => {
      await userEvent.click(el("diary-1"));
      expect(el("menuOpenIcon")).toBeTruthy();

      // タグがあれば表示
      expect(el("diaryTag-0")).toHaveTextContent(result.diaries[1].tag_list[0]);
      expect(el("diaryTag-1")).toHaveTextContent(result.diaries[1].tag_list[1]);
      // 日付が表示
      expect(el("diaryDate")).toHaveTextContent(result.diaries[1].date);
      // 日記内容が表示
      expect(el("diaryContent")).toHaveTextContent(result.diaries[1].content);
      // 画像があれば表示
      expect(el("diaryPicture")).toBeTruthy();
    });
  });
});
