import React, { VFC, Fragment, useState, useEffect, useContext, useReducer} from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

// contexts
import { CurrentUserContext } from '../../contexts/CurrentUser';

// apis
import { fetchHome, getDiaies } from '../../apis/home';
import { createDiary, updateDiary, deleteDiary } from '../../apis/diaries';

// icons
import { CreateIcon } from '../../components/Icons';

// components
import { BaseButton } from '../../components/shared_style';
import { PagenationArea } from '../../components/PagenationArea';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { DiaryIndex, DiaryCreateDialog, DiaryDialog } from '../../components/diaries';
import CircularProgress from '@material-ui/core/CircularProgress';

// constants
import { HTTP_STATUS_CODE, REQUEST_STATE  } from '../../constants';

// helpers
import { dateToday, onSubmitText, isDisabled } from '../../helpers';

// reducers
import { initialState as reducerInitialState, submitActionTypes, submitReducer } from '../../reducers/submit';

// css
const LoginHomeWrapper = styled.div`
  position: relative;
  width: 90vw;
  height: auto;
  margin: 6.6vh auto 0 auto;
  padding-top: 2rem;
`;

const Heading = styled.h1`
  text-align: center;
  color: royalblue;
`;

const OpenDiaryCreateDialogButton = styled(BaseButton)`
  height: 2.5rem;
  width: 10rem;
  border: .0125rem solid green;
  letter-spacing: .2rem;
  font-size: 0.95rem;
  background-color: green;
  color: white;
  :hover {
    opacity: .8;
  }
  @media screen and (max-width:480px) {
    width: 100%;
  }
`;
const IconWrapper = styled.span`
  margin-right: 1rem;
`;

const CircularProgressWrapper = styled.span`
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;
// 型
interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string | null;
  user_id: number;
}

type TApiError = Array<string>;
interface IApiErrors {
  date?: TApiError;
  content?: TApiError;
  picture?: TApiError;
  full_messages: TApiError;
}

interface IPagy {
  page: number;
  pages: number;
}

interface IInitialState {
  anchorEl: HTMLElement | null;
  apiErrors: IApiErrors | undefined;
  diaries: Array<IDiary> | undefined;
  fetchState: 'INITIAL' | 'LOADING' | 'OK';
  pagy: IPagy| undefined;
  selectedDiary: IDiary | null;
  isOpenDiaryCreateDialog: boolean;
  isOpenDiaryDialog: boolean;
  isOpenDiaryEdit: boolean;
  isOpenConfirmDialog: boolean;
}

// Formから送信される情報
type TPicture = Array<{data:string, name: string}>;
interface IFormValues {
  date: string;
  content: string;
  picture?: TPicture;
  diaryId?: number;
}

type TClickHTMLElement = React.MouseEvent<HTMLElement>;

export const LoginHome: VFC = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { handleSubmit, errors, control , watch, register} = useForm<IFormValues>();
  const [reducerState, dispatch] = useReducer(submitReducer, reducerInitialState);
  const initialState: IInitialState = {
    anchorEl: null,
    apiErrors: undefined,
    diaries: undefined,
    fetchState: REQUEST_STATE.INITIAL,
    pagy: undefined,
    selectedDiary: null,
    isOpenDiaryCreateDialog: false,
    isOpenDiaryDialog: false,
    isOpenDiaryEdit: false,
    isOpenConfirmDialog: false,
  }
  const [state, setState] = useState<IInitialState>(initialState);

  // ここからPagenationAreaで使う関数
    // ページネションのページ番号が選択されたら、その番号に応じてデータを受け取る
    const onPageChange = (page: number): void => {
      getDiaies(currentUser!.headers, page)
      .then(data => {
        setState({
          ...state,
          diaries: data.diaries,
          pagy: data.pagy,
        })
      })
      .catch(e => {
        if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED){
          setCurrentUser(undefined);
        } else {
          throw e;
        }
      })
    };
  // ここまでPagenationAreaで使う関数

  // ここから DiaryIndexで使う関数
    // Diaries内でユーザがクリックした日記のデータを取得し、DiaryDialogへ投げて開く
    const onOpenDiaryDialog = (diary: IDiary): void => {
      setState({
        ...state,
        selectedDiary: diary,
        isOpenDiaryDialog: true,
      })
    };
  // ここまで DiaryIndexで使う関数

  // ここからDiaryCreateDialogとDiaryEditで共通して使う関数
    // DiaryCreateDialogで選択されたfile名を返す
    const setFileName = ():string => {
      const InputPicture:TPicture | undefined = watch("picture");
      if(InputPicture && InputPicture![0] != null){
        return InputPicture![0].name.slice(0, 20);
      } else{
        return "画像を選択する";
      }
    };

    // fileをbase64にエンコード
    const onFileChange = (e: any): void => {
      const file = e.target.files[0];
      if(file) {
        const reader = new FileReader();
        reader.onload = () => file.data = (reader.result);
        reader.readAsDataURL(file);
      }
    };
  // ここまでDiaryCreateDialogとDiaryEditで共通して使うやつ

  // ここから DiaryCreateDialogで使う関数
  // DiaryCreateDialogでFormのボタンが押されたらApiを叩く
  const onCreateSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING});
    createDiary(currentUser!.headers,
      {
        date: formValues.date,
        content: formValues.content,
        picture: formValues.picture? formValues.picture[0] : undefined,
      },
      )
      .then((data): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL});
        setState({
          ...state,
          diaries: data.diaries,
          isOpenDiaryCreateDialog: false,
          pagy: data.pagy,
        })
      })
      .catch((e): void => {
        if (e.response.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
          dispatch({ type: submitActionTypes.POST_INITIAL });
          setState({
            ...state,
            apiErrors: e.response.data.errors,
          })
        } else {
          dispatch({ type: submitActionTypes.POST_INITIAL });
          throw e;
        }
      });
    };
    // CreateDialogを開く
    const onOpenDiaryCreateDialog = (): void => {
      setState({
        ...state,
        isOpenDiaryCreateDialog: true,
      })
    };

    // CreateDialogを閉じる
    const onCloseDiaryCreateDialog = (): void => {
      setState({
        ...state,
        isOpenDiaryCreateDialog: false,
        apiErrors: undefined,
      })
    };
    // ここまでDiaryCreateDialogで使う関数

  // ここからDiaryEditで使う関数
  const onEditSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING});
    updateDiary(currentUser!.headers,{
      date: formValues.date,
      content: formValues.content,
      picture: formValues.picture? formValues.picture[0] : undefined,
    }, state.pagy!.page, state.selectedDiary!.id)
    .then((data): void => {
      dispatch({ type: submitActionTypes.POST_INITIAL});
      setState({
        ...state,
        diaries: data.diaries,
        pagy: data.pagy,
        isOpenDiaryEdit: false,
        isOpenDiaryDialog: false,
      });
    })
    .catch((e): void => {
      if (e.response.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        setState({
          ...state,
          apiErrors: e.response.data.errors,
        })
      } else {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        throw e;
      }
    });
  };
  // ここまでDiaryEditで使う関数

  // ここからDiaryDialogで使う関数
    // DiaryDialog を閉じる
    const onCloseDiaryDialog = (): void => {
      setState({
        ...state,
        isOpenDiaryDialog: false,
        isOpenDiaryEdit: false,
      })
    };
  // ここまでDiaryDialogで使う関数

  // ここからDiaryMenu(DiaryDialogに埋め込まれている)で使う関数
    const onOpenCofirmationDialog = (): void => {
      setState({
        ...state,
        isOpenConfirmDialog: true,
        anchorEl: null,
      })
    };

    const onCloseCofirmationDialog = (): void => {
      setState({
        ...state,
        isOpenConfirmDialog: false,
      })
    };

    // DiaryDialogで開かれている日記データを削除
    const onDiaryDelete = (diary: IDiary): void => {
      deleteDiary(currentUser!.headers, state.pagy!.page, diary.id)
      .then((data): void => {
        setState({
          ...state,
          diaries: data.diaries,
          pagy: data.pagy,
          isOpenConfirmDialog: false,
          isOpenDiaryEdit: false,
          isOpenDiaryDialog: false,
        });
      })
      .catch((e): void => {
        if (e.response.status === (HTTP_STATUS_CODE.FORBIDDEN || HTTP_STATUS_CODE.UNAUTHORIZED)) {
          setCurrentUser(undefined);
        } else {
          throw e;
        }
      });
    };

    // メニューバーを開く
    const onMenuOpen = (e: TClickHTMLElement): void => {
      setState({
        ...state,
        anchorEl: e.currentTarget,
      })
    };

    // メニューバーを閉じる
    const onMenuClose = (): void => {
      setState({
        ...state,
        anchorEl: null,
      })
    };

    // Dialogの内容を閲覧用に変更する
    const onDiaryShowMode = (): void => {
      setState({
        ...state,
        anchorEl: null,
        isOpenDiaryEdit: false,
      });
    };

    // Dialogの内容を編集用に変更する
    const onDiaryEditMode = (): void => {
      setState({
        ...state,
        anchorEl: null,
        isOpenDiaryEdit: true,
      });
    };
  // ここまでDiaryMenuで使う関数

  // このコンポーネントが開かれた時にだけ実行される
  useEffect((): void => {
    setState({
      ...state,
      fetchState: REQUEST_STATE.LOADING,
    })
    fetchHome(currentUser!.headers)
    .then((data): void => {
      setState({
        ...state,
        diaries: data.diaries,
        pagy: data.pagy,
        fetchState: REQUEST_STATE.OK,
      })
    })
    .catch((e): void => {
      if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED){
        setCurrentUser(undefined);
      } else {
        throw e;
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <LoginHomeWrapper data-testid="loginHome">
      <Heading>Diaries</Heading>
      <OpenDiaryCreateDialogButton onClick={onOpenDiaryCreateDialog}>
        <IconWrapper>
          <CreateIcon fontSize={"small"} />
        </IconWrapper>
        日記作成
      </OpenDiaryCreateDialogButton>
      {
        state.fetchState === REQUEST_STATE.LOADING ?
        <CircularProgressWrapper>
          <CircularProgress />
        </CircularProgressWrapper>
        :
          state.diaries != null  && state.pagy != null &&
            <Fragment>
              {
                state.diaries.length ?
                  <Fragment>
                    <DiaryIndex
                      diaries={state.diaries}
                      onOpenDiaryDialog={onOpenDiaryDialog}
                      />
                    <PagenationArea
                      onPageChange={onPageChange}
                      pagy={state.pagy}
                      />
                  </Fragment>
                :
                  <h2>値がないよ</h2>
              }
            </Fragment>
      }
        {
          state.isOpenDiaryCreateDialog &&
          <DiaryCreateDialog
            apiErrors={state.apiErrors}
            contentCount={watch("content","").length}
            control={control}
            dateToday={dateToday()}
            errors={errors}
            isOpen={state.isOpenDiaryCreateDialog}
            isDisabled={isDisabled(reducerState.postState)}
            onClose={onCloseDiaryCreateDialog}
            onFileChange={onFileChange}
            onSubmit={handleSubmit(onCreateSubmit)}
            onSubmitText={onSubmitText(reducerState.postState, "日記作成")}
            register={register}
            setFileName={setFileName()}
          />
        }
        {
          state.isOpenDiaryDialog && state.selectedDiary &&
          <DiaryDialog
            anchorEl={state.anchorEl}
            apiErrors={state.apiErrors}
            contentCount={watch("content",state.selectedDiary.content).length}
            control={control}
            diary={state.selectedDiary}
            errors={errors}
            isDisabled={isDisabled(reducerState.postState)}
            isOpen={state.isOpenDiaryDialog}
            isOpenDiaryEdit={state.isOpenDiaryEdit}
            onClose={onCloseDiaryDialog}
            onOpenCofirmationDialog={onOpenCofirmationDialog}
            onDiaryShowMode={onDiaryShowMode}
            onDiaryEditMode={onDiaryEditMode}
            onFileChange={onFileChange}
            onMenuClose={onMenuClose}
            onMenuOpen={onMenuOpen}
            onEditSubmit={handleSubmit(onEditSubmit)}
            onSubmitText={onSubmitText(reducerState.postState, "日記編集")}
            register={register}
            setFileName={setFileName()}
          />
        }
        {
          state.isOpenConfirmDialog && state.selectedDiary &&
          <ConfirmDialog
            isOpen={state.isOpenConfirmDialog}
            diary={state.selectedDiary}
            title={'削除確認'}
            contentText={'選択した日記を削除しますか？'}
            onDeleteButton={onDiaryDelete}
            onClose={onCloseCofirmationDialog}
          />
        }
    </LoginHomeWrapper>
  );
}
