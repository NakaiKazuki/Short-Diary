import {
  ChangeEvent,
  FC,
  Fragment,
  MouseEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { YouTubeProps, YouTubeEvent, YouTubePlayer } from "react-youtube";
import styled from "styled-components";

// atoms
import { authAtom } from "../atoms/Auth";
import { messageAtom } from "../atoms/Message";

// apis
import { getHome, getDiaries } from "../apis/home";
import { createDiary, updateDiary, deleteDiary } from "../apis/diaries";

// icons
import { CreateIcon, SearchIcon } from "../components/icon";

// components
import { BaseButton } from "../components/shared_style";
import { PaginationArea } from "../components/PaginationArea";
import { ConfirmDialog } from "../components/ConfirmDialog";
import {
  DiaryCreateDialog,
  DiaryDialog,
  DiaryIndex,
  DiarySearchDrawer,
} from "../components/diaries";
import { CircularProgress } from "@mui/material";
// constants
import { HTTP_STATUS_CODE, REQUEST_STATE } from "../constants";

// helpers
import {
  dateToday,
  formattedDate,
  isDisabled,
  onSubmitText,
  removeUserCookies,
  scroll,
} from "../helpers";

// reducers
import {
  initialState as reducerInitialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// types
import {
  IDiary,
  IFile,
  ILoginHomeFormValues as IFormValues,
  ILoginHomeInitialState as IInitialState,
  ISearchFormValue,
} from "../types/containers";

// css
const Container = styled.div`
  margin: 0 auto 9vh auto;
  min-height: 93.5vh;
  padding-top: 6.5vh;
  position: relative;
  width: 90vw;
`;

const Heading = styled.h1`
  color: limegreen;
  font-family: Comic Sans MS;
  font-size: 4rem;
  margin-top: 10rem;
  text-align: center;
  text-shadow: 3px 0px 2px green;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 480px) {
    height: 5.2rem;
  }
`;

const Button = styled(BaseButton)`
  background-color: white;
  border: 2px solid limegreen;
  color: limegreen;
  font-size: 1.3rem;
  height: 2.8rem;
  letter-spacing: 0.2rem;
  padding: 0 2rem;

  :hover {
    background-color: limegreen;
    color: white;
    opacity: 0.8;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const DrawerOpenButton = styled(Button)`
  float: right;
  @media screen and (max-width: 480px) {
    margin-top: 0.8rem;
  }
`;

const IconWrapper = styled.span`
  margin-right: 1rem;
`;

const CircularProgressContainer = styled.span`
  left: 50%;
  position: absolute;
  top: 50vh;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const EmptyMessageContainer = styled.div`
  border-radius: 0.5rem;
  border: 0.0125rem solid limegreen;
  height: 17vh;
  margin: 2rem auto 0 auto;
  position: relative;
  text-align: center;
  width: 18%;

  @media screen and (min-width: 768px) and (max-width: 979px) {
    width: 44%;
  }

  @media screen and (max-width: 767px) {
    height: 10rem;
    margin-top: 4rem;
    width: 100%;
  }
`;

const EmptyMessage = styled.span`
  background-color: white;
  left: 50%;
  margin-top: 50% 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const DiariesWrapper = styled.div`
  margin-bottom: 3rem;

  @media screen and (max-width: 480px) {
    margin: 7rem 0;
  }
`;

export const LoginHome: FC = () => {
  const setCurrentUser = useSetRecoilState(authAtom);
  const setMessage = useSetRecoilState(messageAtom);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm<IFormValues>();
  const [reducerState, dispatch] = useReducer(
    submitReducer,
    reducerInitialState
  );
  const initialState: IInitialState = {
    anchorEl: null,
    resultErrors: undefined,
    diaries: undefined,
    fetchState: REQUEST_STATE.INITIAL,
    pagy: undefined,
    selectedDate: null,
    selectedDiary: null,
    searchWord: "",
    isOpenDiaryCreateDialog: false,
    isOpenDiaryDialog: false,
    isOpenDiaryEdit: false,
    isOpenConfirmDialog: false,
    isOpenDrawer: false,
  };
  const [state, setState] = useState<IInitialState>(initialState);

  // ユーザ情報削除してログイン画面へ誘導
  const removeSession = (e: { response: { status: 401 | 403 } }): void => {
    if (
      e.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
      e.response?.status === HTTP_STATUS_CODE.FORBIDDEN
    ) {
      setCurrentUser(undefined);
      removeUserCookies();
      navigate("/login", { replace: true });
    } else {
      console.error(e);
      throw e;
    }
  };

  // このコンポーネントが開かれた時にだけ実行される
  useEffect(() => {
    setState({
      ...state,
      fetchState: REQUEST_STATE.LOADING,
    });
    getHome()
      .then((data): void => {
        setState({
          ...state,
          diaries: data.diaries,
          pagy: data.pagy,
          fetchState: REQUEST_STATE.OK,
        });
      })
      .catch((e): void => {
        removeSession(e);
      });
  }, []);

  // ここからPaginationAreaで使う関数
  // ページネションのページ番号が選択されたら、その番号に応じてデータを受け取る
  const ref = useRef<HTMLDivElement>(null);
  const onPageChange = async (page: number): Promise<void> => {
    await getDiaries(page, state.selectedDate?.toISOString().split("T")[0]) // page,2023-05-06 みたいな感じ
      .then((data) => {
        setState({
          ...state,
          diaries: data.diaries,
          pagy: data.pagy,
        });
        scroll(ref);
      })
      .catch((e) => {
        removeSession(e);
      });
  };
  // ここまでPaginationAreaで使う関数

  // 検索用Drawerで使う関数
  // Drawerの開閉に使用
  const onDrawerOpenButton = (open: boolean) => () => {
    setState({
      ...state,
      isOpenDrawer: open,
    });
  };
  // 日付を指定して検索する場合に使用
  const convertDate = (selectedDate: Date): Date | undefined => {
    const date = new Date(new Date(selectedDate).toLocaleString("ja"));
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const onDateChange = async (selectedDate: null | Date): Promise<void> => {
    await getHome(selectedDate ? convertDate(selectedDate) : undefined)
      .then((data): void => {
        setState({
          ...state,
          selectedDate: selectedDate,
          searchWord: "",
          diaries: data.diaries,
          pagy: data.pagy,
          isOpenDrawer: false,
          fetchState: REQUEST_STATE.OK,
        });
      })
      .catch((e): void => {
        removeSession(e);
      });
  };

  // 単語を指定して検索する場合に使用
  const onWordSearchSubmit = async (
    formValues: ISearchFormValue
  ): Promise<void> => {
    await getHome(formValues.searchWord)
      .then((data): void => {
        setState({
          ...state,
          selectedDate: null,
          searchWord: formValues.searchWord,
          diaries: data.diaries,
          pagy: data.pagy,
          isOpenDrawer: false,
          fetchState: REQUEST_STATE.OK,
        });
      })
      .catch((e): void => {
        removeSession(e);
      });
  };

  // 検索内容を消去するボタンに使用
  const onSearchClearButton = async (): Promise<void> => {
    await getHome()
      .then((data): void => {
        setState({
          ...state,
          selectedDate: null,
          searchWord: "",
          diaries: data.diaries,
          pagy: data.pagy,
          isOpenDrawer: false,
          fetchState: REQUEST_STATE.OK,
        });
        reset({ searchWord: "" });
      })
      .catch((e): void => {
        removeSession(e);
      });
  };
  // ここまでSearchFieldで使う関数

  // ここから DiaryIndexで使う関数
  // Diaries内でユーザがクリックした日記のデータを取得し、DiaryDialogへ投げて開く
  const onOpenDiaryDialog = (diary: IDiary): void => {
    setState({
      ...state,
      selectedDiary: diary,
      isOpenDiaryDialog: true,
    });
  };
  // ここまで DiaryIndexで使う関数

  // ここからDiaryCreateDialogとDiaryEditで共通して使う関数
  // DiaryCreateDialogで選択されたfile名を返す
  const setFileName = (): string =>
    watch("picture")?.[0]?.name.slice(0, 20) ?? "画像を選択する";

  // fileをbase64にエンコード
  const onFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target?.files?.[0] as IFile;

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => (file.data = reader.result);
    reader.readAsDataURL(file);
  };
  // ここまでDiaryCreateDialogとDiaryEditで共通して使うやつ

  // ここから DiaryCreateDialogで使う関数
  // DiaryCreateDialogでFormのボタンが押されたらApiを叩く
  const onCreateSubmit = async (formValues: IFormValues): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });
    await createDiary({
      date: formValues.date,
      tag_list: formValues.tag_list?.trim(),
      content: formValues.content,
      picture: formValues.picture?.[0],
      movie_source: formValues.movie_source,
    })
      .then((data): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        setState({
          ...state,
          diaries: data.diaries,
          isOpenDiaryCreateDialog: false,
          pagy: data.pagy,
        });
        setMessage("日記の作成に成功しました。");
      })
      .catch((e): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (e.response?.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
          setState({
            ...state,
            resultErrors: e.response?.data.errors,
          });
        } else removeSession(e);
      });
  };

  // CreateDialogを開く
  const onOpenDiaryCreateDialog = (): void => {
    setState({
      ...state,
      isOpenDiaryCreateDialog: true,
    });
  };

  // CreateDialogを閉じる
  const onCloseDiaryCreateDialog = (): void => {
    setState({
      ...state,
      isOpenDiaryCreateDialog: false,
      resultErrors: undefined,
    });
  };
  // ここまでDiaryCreateDialogで使う関数

  // ここからDiaryEditで使う関数
  const onEditSubmit = async (formValues: IFormValues): Promise<void> => {
    dispatch({ type: submitActionTypes.POSTING });

    if (!(state.pagy && state.selectedDiary)) return;

    await updateDiary(
      {
        date: formValues.date,
        tag_list: formValues.tag_list?.trim(),
        content: formValues.content,
        picture: formValues.picture?.[0],
        movie_source: formValues.movie_source,
      },
      state.pagy.page,
      state.selectedDiary.id
    )
      .then((data): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        setState({
          ...state,
          diaries: data.diaries,
          pagy: data.pagy,
          isOpenDiaryEdit: false,
          isOpenDiaryDialog: false,
          selectedDate: null,
        });
        setMessage("日記の編集に成功しました。");
      })
      .catch((e): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (e.response?.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
          setState({
            ...state,
            resultErrors: e.response?.data.errors,
          });
        } else removeSession(e);
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
    });
  };

  // 動画を再生するのに使用
  const onPlayerReady: YouTubeProps["onReady"] = (
    e: YouTubeEvent<{ target: YouTubePlayer }>
  ): void => {
    e.target.pauseVideo();
  };
  // ここまでDiaryDialogで使う関数

  // ここからDiaryMenu(DiaryDialogに埋め込まれている)で使う関数
  // ConfirmationDialogを開く
  const onOpenCofirmationDialog = (): void => {
    setState({
      ...state,
      isOpenConfirmDialog: true,
      anchorEl: null,
    });
  };

  // ConfirmationDialogを閉じる
  const onCloseCofirmationDialog = (): void => {
    setState({
      ...state,
      isOpenConfirmDialog: false,
    });
  };

  // DiaryDialogで開かれている日記データを削除
  const onDiaryDelete = async (diary: IDiary): Promise<void> => {
    if (!state.pagy) return;

    await deleteDiary(state.pagy.page, diary.id)
      .then((data): void => {
        setState({
          ...state,
          diaries: data.diaries,
          pagy: data.pagy,
          isOpenConfirmDialog: false,
          isOpenDiaryEdit: false,
          isOpenDiaryDialog: false,
          selectedDate: null,
        });
        setMessage("日記の削除に成功しました。");
      })
      .catch((e): void => {
        removeSession(e);
      });
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

  // メニューバーを開く
  const onMenuOpen = (e: MouseEvent<HTMLElement>): void => {
    setState({
      ...state,
      anchorEl: e.currentTarget,
    });
  };

  // メニューバーを閉じる
  const onMenuClose = (): void => {
    setState({
      ...state,
      anchorEl: null,
    });
  };

  // ここまでDiaryMenuで使う関数
  return (
    <Container ref={ref}>
      <Heading data-testid="pageTitle">Diaries</Heading>
      <ButtonsContainer>
        <Button
          onClick={onOpenDiaryCreateDialog}
          data-testid="diaryCreateOpenButton"
        >
          <IconWrapper>
            <CreateIcon data-testid="createIcon" />
          </IconWrapper>
          日記作成
        </Button>
        <DrawerOpenButton
          onClick={onDrawerOpenButton(true)}
          data-testid="drawerOpenButton"
        >
          <IconWrapper>
            <SearchIcon data-testid="SearchIcon" />
          </IconWrapper>
          Search
        </DrawerOpenButton>
      </ButtonsContainer>
      <DiarySearchDrawer
        control={control}
        selectedDate={state.selectedDate}
        isOpenDrawer={state.isOpenDrawer}
        onOpenButton={(open) => onDrawerOpenButton(open)}
        onClearButton={onSearchClearButton}
        onSubmit={handleSubmit(onWordSearchSubmit)}
        onDateChange={(date: Date | null): Promise<void> => onDateChange(date)}
      />
      {state.fetchState === REQUEST_STATE.LOADING ? (
        <CircularProgressContainer>
          <CircularProgress sx={{ color: "limegreen" }} />
        </CircularProgressContainer>
      ) : (
        <Fragment>
          {state.diaries?.length && state.pagy ? (
            <DiariesWrapper>
              <PaginationArea onPageChange={onPageChange} pagy={state.pagy} />
              <DiaryIndex
                diaries={state.diaries}
                formattedDate={formattedDate}
                onOpenDiaryDialog={onOpenDiaryDialog}
              />
              <PaginationArea onPageChange={onPageChange} pagy={state.pagy} />
            </DiariesWrapper>
          ) : (
            <EmptyMessageContainer>
              <EmptyMessage>日記がありません</EmptyMessage>
            </EmptyMessageContainer>
          )}
        </Fragment>
      )}
      <DiaryCreateDialog
        resultErrors={state.resultErrors}
        contentCount={watch("content", "").length || 0}
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
      {state.isOpenDiaryDialog && state.selectedDiary && (
        <DiaryDialog
          anchorEl={state.anchorEl}
          resultErrors={state.resultErrors}
          contentCount={
            watch("content")
              ? watch("content", "").length
              : state.selectedDiary.content.length
          }
          control={control}
          diary={state.selectedDiary}
          errors={errors}
          isDisabled={isDisabled(reducerState.postState)}
          isOpen={state.isOpenDiaryDialog}
          isOpenDiaryEdit={state.isOpenDiaryEdit}
          formattedDate={formattedDate}
          onClose={onCloseDiaryDialog}
          onOpenCofirmationDialog={onOpenCofirmationDialog}
          onDiaryShowMode={onDiaryShowMode}
          onDiaryEditMode={onDiaryEditMode}
          onFileChange={onFileChange}
          onMenuClose={onMenuClose}
          onMenuOpen={onMenuOpen}
          onEditSubmit={handleSubmit(onEditSubmit)}
          onSubmitText={onSubmitText(reducerState.postState, "日記編集")}
          setFileName={setFileName()}
          onPlayerReady={onPlayerReady}
          register={register}
        />
      )}
      {state.isOpenConfirmDialog && state.selectedDiary && (
        <ConfirmDialog
          isOpen={state.isOpenConfirmDialog}
          obj={state.selectedDiary}
          title="削除確認"
          contentText="選択した日記を削除しますか？"
          onDelete={onDiaryDelete}
          onClose={onCloseCofirmationDialog}
        />
      )}
    </Container>
  );
};
