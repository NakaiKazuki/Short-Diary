import React from 'react';
import '@testing-library/jest-dom';
import { render , screen, cleanup,act,waitFor} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { CurrentUserContext } from '../../contexts/CurrentUser';
import { LoginHome } from '../../containers/LoginHome';
import { dateToday } from '../../helpers';
import { home, diary } from '../../urls';

// 型
interface IHeaders {
  'access-token': string;
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
  }
}

// ユーザデータ
const currentUser = {
  headers: {
    'access-token': 'testtoken',
    client: 'testclient',
    uid: 'test@example.com',
  },
  data: {
    id: 1,
    name: 'test',
    email: 'test@example.com',
  },
};
const providerProps = {
  value:{
    currentUser: currentUser,
    setCurrentUser: jest.fn(),
  }
}

// Apiから返ってくるデータ
const returnData = {
  diaries: [
    {
      id: 1,
      date: dateToday(),
      content: 'Test Content',
      tag_list: [],
      picture_url: null,
      user_id: 1,
    },
    {
      id: 2,
      date: dateToday(),
      content: 'A123456789B123456789C123456789D123456789E123456789F123456789',
      tag_list: ['testTag1', 'testTag2'],
      picture_url: '/testurl',
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
  errors:{
    date: ['date ApiError'],
    content: ['cotent ApiError'],
    picture: ['picture ApiError'],
  }
}

// 正しいForm情報
const formInfo = [
  {
    testId: 'dateArea',
    value: dateToday(),
  },
  {
    testId: 'contentArea',
    value: 'testContent',
  },
];

const idNames = ['date', 'content', 'picture'];

const customRender = (ui: JSX.Element, { providerProps }: {providerProps: IProviderProps}) => {
  return render(
    <CurrentUserContext.Provider {...providerProps}>{ui}</CurrentUserContext.Provider>
  );
};

const mockAxios = new MockAdapter(axios);
mockAxios.onGet(home).reply(200, returnData);

const el = screen.getByTestId;
afterEach(cleanup);

describe('LoginHome', () =>{
  beforeEach(async() => {
    await act(async () => {
      customRender(<LoginHome />,{providerProps})
    })
  })

  it('日記一覧が表示', () => {
    expect(el('diaryIndex')).toBeTruthy();
  })

  it('PagenationBarが表示', () => {
    expect(el('pagenationBar')).toBeTruthy();
  })

  describe('DiaryCreateDialog',() => {
    it('OpenButton', () => {
      expect(el('diaryCreateOpenButton')).toContainElement(el('createIcon'));
      expect(el('diaryCreateOpenButton')).toHaveTextContent('日記作成');
    })

    it('OpenButtonクリックで開く', () => {
      // Dialogを開く
      userEvent.click(el('diaryCreateOpenButton'));
      expect(el('diaryCreateDialog')).toBeTruthy();
    })

    it('DialogTitle', () => {
      // Dialogを開く
      userEvent.click(el('diaryCreateOpenButton'));
      expect(el('diaryCreateDialog')).toContainElement(el('diaryCreateDialogTitle'));
    })

    it('データの作成に成功した場合Dialogを閉じる', async () => {
      // ApiResponseを設定
      mockAxios.onPost(diary).reply(200,returnData);
      // Dialogを開く
      userEvent.click(el('diaryCreateOpenButton'));
      // 各項目に有効な値を入力
      formInfo.forEach(obj => userEvent.type(el(obj.testId), obj.value));
      // ユーザが送信ボタンをクリック
      userEvent.click(el('formSubmit'));

      await waitFor(() => {
        const dialog = screen.queryByTestId('diaryCreateDialog');
        expect(dialog).toBeNull();
      })
    })

    it('データの作成に失敗した場合Dialogは閉じない', async () => {
      // ApiResponseを設定
      mockAxios.onPost(diary).reply(422,returnErrorData);
      // Dialogを開く
      userEvent.click(el('diaryCreateOpenButton'));
      // 各項目に有効な値を入力
      formInfo.forEach(obj => userEvent.clear(el(obj.testId)));
      // ユーザが送信ボタンをクリック
      userEvent.click(el('formSubmit'));

      await waitFor(() => {
        const dialog = screen.queryByTestId('diaryCreateDialog');
        expect(dialog).toBeTruthy();
      })
    })

    describe('Form欄', () => {
      beforeEach(() => userEvent.click(el('diaryCreateOpenButton')));

      it('各入力欄のブロックがある', () => {
        idNames.forEach(idName => {
          expect(el('diaryForm')).toContainElement(el(`FormItem-${idName}`));
        });
      })

      it('ErrorMessage', async() => {
        // ApiResponseを設定
        mockAxios.onPost(diary).reply(200,returnData);

        // 各項目に無効な値を入力
        formInfo.forEach(obj => userEvent.clear(el(obj.testId)));

        // ユーザが送信ボタンをクリック
        userEvent.click(el('formSubmit'));

        // エラーメッセージが表示(contentにのみ表示
        await waitFor(() => expect(el('FormItem-content')).toContainElement(el('contentErrorMessage')));
      })

      it('APIErrorMessage', async() => {
        // ApiResponseを設定
        mockAxios.onPost(diary).reply(422,returnErrorData);

        // 各項目に有効な値を入力
        formInfo.forEach(obj => userEvent.type(el(obj.testId), obj.value));

        // ユーザが送信ボタンをクリック
        userEvent.click(el('formSubmit'));

        // 各項目に対応したApiからのエラーメッセージが表示
        await waitFor(() => idNames.forEach(
          idName => expect(el(`FormItem-${idName}`)).toContainElement(el(`${idName}ApiError`))
        ))
      })

      describe('入力欄', () => {
        it('入力欄初期値', () => {
          // date
          expect(el('dateArea')).toHaveValue(dateToday());
          // content
          expect(el('contentArea')).toHaveValue("");
          // picture
          expect(el('pictureArea')).toHaveValue("");
        })

        it ('content欄は入力した文字数が表示', () => {
          const testContent = 'testContent'
          userEvent.type(el('contentArea'), testContent);
          expect(el('contentCount')).toHaveTextContent(`${testContent.length}/200`)
        })
      })

      describe('送信ボタン', () => {
        it('送信ボタンがある', () => {
          expect(el('formSubmit')).toHaveAttribute('type', 'submit');
          expect(el('formSubmit')).toHaveTextContent('日記作成');
        })

        it('送信状況によってボタンが変化 Status422', async() => {
          // ApiResponse
          mockAxios.onPost(diary).reply(422,returnErrorData);

          // 各項目に有効な値を入力
          formInfo.forEach(obj => userEvent.type(el(obj.testId), obj.value));

          // 初期値
          expect(el('formSubmit')).toHaveTextContent('日記作成');
          expect(el('formSubmit')).not.toBeDisabled();

          // ユーザが送信ボタンをクリック
          userEvent.click(el('formSubmit'));

          // APIからエラーが返ってくると初期値に戻る
          await waitFor(() => {
            expect(el('formSubmit')).toHaveTextContent('日記作成');
            expect(el('formSubmit')).not.toBeDisabled();
          });
        })
      })
    })
  })

  describe('DiaryDialog', () => {
    it('日記をクリックすると表示', () => {
      userEvent.click(el('diary-0'));
      expect(el('diaryDialog')).toBeTruthy();
    })

    it('初期値(タグ無し, 画像無し)', () => {
      // 日記データをクリック
      userEvent.click(el('diary-0'));
      // MenuIconが表示
      expect(el('menuIcon')).toBeTruthy();
      // 日付が表示
      expect(el('diaryDate')).toHaveTextContent(returnData.diaries[0].date);
      // タグが空配列なら表示しない
      expect(screen.queryByTestId('diaryTag-0')).toBeNull();
      // 日記内容が表示
      expect(el('diaryContent')).toHaveTextContent(returnData.diaries[0].content);
      // 画像がない場合は表示しない
      expect(screen.queryByTestId('diaryPicture')).toBeNull();
    })

    it('初期値(タグあり, 画像あり)', () => {
      // 日記データをクリック
      userEvent.click(el('diary-1'));
      // MenuIconが表示
      expect(el('menuIcon')).toBeTruthy();
      // タグがあれば表示
      returnData.diaries[0].tag_list.forEach((tag, index) => {
        expect(el(`diaryTag-${index}`)).toHaveTextContent(tag);
      })
      // 日付が表示
      expect(el('diaryDate')).toHaveTextContent(returnData.diaries[1].date);
      // 日記内容が表示
      expect(el('diaryContent')).toHaveTextContent(returnData.diaries[1].content);
      // 画像があれば表示
      expect(el('diaryPicture')).toBeTruthy();
    })

    it('MenuBarの編集クリックで編集用画面に変更',() => {
      // 日記データを開く
      userEvent.click(el('diary-0'));
      // メニューを開く
      userEvent.click(el('menuIcon'));
      // 編集をクリック
      userEvent.click(el('MenuItemDiaryEdit'));
      expect(el('diaryEditTitle')).toHaveTextContent('日記編集');
    })

    it('MenuBarの削除クリックで確認用Dialog表示',() => {
      // 日記データを開く
      userEvent.click(el('diary-0'));
      // メニューを開く
      userEvent.click(el('menuIcon'));
      // 編集をクリック
      userEvent.click(el('MenuItemDiaryDelete'));
      expect(el('confirmDialog')).toBeTruthy();
    })

    describe('DiaryEdit', () => {
      beforeEach(() => {
        userEvent.click(el('diary-0'))
        userEvent.click(el('MenuItemDiaryEdit'));
      });

      it('各入力欄のブロックがある', () => {
        idNames.forEach(idName => {
          expect(el('diaryForm')).toContainElement(el(`FormItem-${idName}`));
        });
      })

      it('ErrorMessage', async() => {
        // ApiResponseを設定
        mockAxios.onPatch(`${diary}/${returnData.diaries[0].id}`).reply(200,returnData);

        // 各項目に無効な値を入力
        formInfo.forEach(obj => userEvent.clear(el(obj.testId)));
        // ユーザが送信ボタンをクリック
        userEvent.click(el('formSubmit'));

        // エラーメッセージが表示(contentにのみ表示
        await waitFor(() => expect(el('FormItem-content')).toContainElement(el('contentErrorMessage')));
      })

      it('APIErrorMessage', async() => {
        // ApiResponseを設定
        mockAxios.onPatch(`${diary}/${returnData.diaries[0].id}`).reply(422,returnErrorData);

        // 各項目に有効な値を入力
        formInfo.forEach(obj => userEvent.type(el(obj.testId), obj.value));

        // ユーザが送信ボタンをクリック
        userEvent.click(el('formSubmit'));

        // 各項目に対応したApiからのエラーメッセージが表示
        await waitFor(() => idNames.forEach(
          idName => expect(el(`FormItem-${idName}`)).toContainElement(el(`${idName}ApiError`))
        ))
      })

      describe('入力欄', () => {
        it('入力欄初期値', () => {
          // date
          expect(el('dateArea')).toHaveValue(returnData.diaries[0].date);
          // contentｘｘ
          expect(el('contentArea')).toHaveValue(returnData.diaries[0].content);
          // picture
          expect(el('pictureArea')).toHaveValue("");
        })

        it ('content欄は入力した文字数が表示', () => {
          expect(el('contentCount')).toHaveTextContent(`${returnData.diaries[0].content.length}/200`)
        })
      })

      describe('送信ボタン', () => {
        it('送信ボタンがある', () => {
          expect(el('formSubmit')).toHaveAttribute('type', 'submit');
          expect(el('formSubmit')).toHaveTextContent('日記編集');
        })

        it('送信状況によってボタンが変化 Status422', async() => {
          // ApiResponse
          mockAxios.onPatch(`${diary}/${returnData.diaries[0].id}`).reply(422,returnErrorData);

          // 各項目に有効な値を入力
          formInfo.forEach(obj => userEvent.type(el(obj.testId), obj.value));

          // 初期値
          expect(el('formSubmit')).toHaveTextContent('日記編集');
          expect(el('formSubmit')).not.toBeDisabled();

          // ユーザが送信ボタンをクリック
          userEvent.click(el('formSubmit'));

          // APIからエラーが返ってくると初期値に戻る
          await waitFor(() => {
            expect(el('formSubmit')).toHaveTextContent('日記編集');
            expect(el('formSubmit')).not.toBeDisabled();
          });
        })
      })
    })

    describe('ConfirmDilog',() => {
      beforeEach(() => {
        // 日記データを開く
        userEvent.click(el('diary-0'));
        // メニューを開く
        userEvent.click(el('menuIcon'));
        // 削除をクリック
        userEvent.click(el('MenuItemDiaryDelete'));
      })

      it('確認用Dialogが表示、MenuBarは見えなくなる',async () => {
        expect(el('confirmDialog')).toBeTruthy();
        await waitFor(() => expect(el('diaryMenuBar')).toHaveStyle('visibility: hidden'))
      })

      it('削除クリックで全てConfirmDialogとDiaryDialogを閉じる', async () => {
        mockAxios.onDelete(`${diary}/${returnData.diaries[0].id}`).reply(200,returnData);
        // 削除をクリック
        userEvent.click(el('deleteButton'));

        await waitFor(() => {
          expect(screen.queryByTestId('diaryDialog')).toBeNull();
          expect(screen.queryByTestId('confirmDialog')).toBeNull();
        })
      })
    })
  })
})