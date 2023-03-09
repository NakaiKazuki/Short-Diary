import React, {
  FC,
  Fragment,
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { YouTubeProps, YouTubeEvent, YouTubePlayer } from "react-youtube";
import Cookies from "js-cookie";
import styled from "styled-components";

// contexts
import { AuthContext } from "../contexts/Auth";

// apis
import { fetchHome, getDiaies } from "../apis/home";
import { createDiary, updateDiary, deleteDiary } from "../apis/diaries";

// icons
import { CreateIcon, SearchIcon } from "../components/icon";

// components
import { BaseButton } from "../components/shared_style";
import { PagenationArea } from "../components/PagenationArea";
import { ConfirmDialog } from "../components/ConfirmDialog";
import {
  DiaryIndex,
  DiaryCreateDialog,
  DiaryDialog,
  DiarySearchDrawer,
} from "../components/diaries";
import CircularProgress from "@material-ui/core/CircularProgress";

// constants
import { HTTP_STATUS_CODE, REQUEST_STATE } from "../constants";

// helpers
import { onSubmitText, isDisabled, dateToday } from "../helpers";

// reducers
import {
  initialState as reducerInitialState,
  submitActionTypes,
  submitReducer,
} from "../reducers/submit";

// css
const LoginHomeWrapper = styled.div`
  position: relative;
  width: 90vw;
  min-height: 83vh;
  margin: 6.6vh auto 9vh auto;
  padding-top: 2rem;
`;

const Heading = styled.h1`
  text-align: center;
  color: royalblue;
`;

const DiaryCreateOpenButton = styled(BaseButton)`
  height: 2.5rem;
  width: 10rem;
  border: 0.0125rem solid green;
  letter-spacing: 0.2rem;
  font-size: 0.95rem;
  background-color: white;
  color: green;
  :hover {
    opacity: 0.8;
    background-color: green;
    color: white;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const DrawerOpenButton = styled(BaseButton)`
  height: 2.4rem;
  width: 8.5rem;
  border: 0.0125rem solid royalblue;
  letter-spacing: 0.2rem;
  font-size: 0.95rem;
  background-color: white;
  color: royalblue;
  float: right;
  margin-top: 0.8rem;
  :hover {
    opacity: 0.8;
    background-color: royalblue;
    color: white;
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

const EmptyMessageWrapper = styled.div`
  text-align: center;
  margin: 2rem auto 0 auto;
  height: 17vh;
  width: 18%;
  border: 0.0125rem solid limegreen;
  border-radius: 0.5rem;
  position: relative;
  @media screen and (min-width: 768px) and (max-width: 979px) {
    width: 44%;
  }
  @media screen and (max-width: 480px) {
    margin-top: 4rem;
    height: 10rem;
    width: 100%;
  }
`;

const EmptyMessage = styled.span`
  margin-top: 50% 0;
  position: absolute;
  top: 50%;
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
  picture_url: string | undefined;
  tag_list: Array<string | undefined>;
  movie_source: string | undefined;
  user_id: number;
}

interface IApiErrors {
  date?: Array<string>;
  tag_list?: Array<string>;
  content?: Array<string>;
  picture?: Array<string>;
  movie_source?: Array<string>;
}

interface IPagy {
  page: number;
  pages: number;
}

interface IInitialState {
  anchorEl: HTMLElement | null;
  apiErrors: IApiErrors | undefined;
  diaries: Array<IDiary> | undefined;
  fetchState: "INITIAL" | "LOADING" | "OK";
  pagy: IPagy | undefined;
  selectedDate: null | Date;
  selectedDiary: IDiary | null;
  searchWord: string | undefined;
  isOpenDiaryCreateDialog: boolean;
  isOpenDiaryDialog: boolean;
  isOpenDiaryEdit: boolean;
  isOpenConfirmDialog: boolean;
  isOpenDrawer: boolean;
}

// Formから送信される情報
type TPicture = Array<{ data: string; name: string }>;
interface IFormValues {
  date: string;
  tag_list: string | undefined;
  content: string;
  picture: TPicture | undefined;
  movie_source: string;
  searchWord: string | undefined;
}

interface ISearchFormValue {
  searchWord: string | undefined;
}

interface IFile extends File {
  data: string | ArrayBuffer | null;
}

export const LoginHome: FC = () => {
  const { setCurrentUser } = useContext(AuthContext);
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
    apiErrors: undefined,
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

  // ここからPagenationAreaで使う関数
  // ページネションのページ番号が選択されたら、その番号に応じてデータを受け取る

  const scrollIndexTopRef = useRef<HTMLDivElement>(null);
  const onPageChange = (page: number): void => {
    getDiaies(page, state.selectedDate?.toISOString().split("T")[0])
      .then((data) => {
        setState({
          ...state,
          diaries: data.diaries,
          pagy: data.pagy,
        });
        scrollIndexTopRef?.current?.scrollIntoView();
      })
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          setCurrentUser(undefined);
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          navigate("/login", { replace: true });
        } else {
          console.error(e);
          throw e;
        }
      });
  };
  // ここまでPagenationAreaで使う関数

  // 検索用Drawerで使う関数
  // Drawerの開閉に使用
  const onDrawerOpenButton = (open: boolean) => () => {
    setState({
      ...state,
      isOpenDrawer: open,
    });
  };
  // 日付を指定して検索する場合に使用
  const convertDate = (selectedDate: Date) => {
    if (selectedDate) {
      const dateTime = new Date(new Date(selectedDate).toLocaleString("ja"));
      const date = new Date(
        dateTime.getFullYear(),
        dateTime.getMonth(),
        dateTime.getDate(),
        9,
        0,
        0
      );
      return date;
    }
  };

  const onDateChange = (selectedDate: null | Date): void => {
    fetchHome(selectedDate ? convertDate(selectedDate) : undefined)
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
        reset({ searchWord: "" });
      })
      .catch((e): void => {
        if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          setCurrentUser(undefined);
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          navigate("/login", { replace: true });
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  // 単語を指定して検索する場合に使用
  const onWordSearchSubmit = (formValues: ISearchFormValue): void => {
    fetchHome(formValues.searchWord)
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
        console.log(data);
      })
      .catch((e): void => {
        if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          setCurrentUser(undefined);
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          navigate("/login", { replace: true });
        } else {
          console.error(e);
          throw e;
        }
      });
  };

  // 検索内容を消去するボタンに使用
  const onSearchClearButton = (): void => {
    fetchHome()
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
        if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          setCurrentUser(undefined);
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          navigate("/login", { replace: true });
        } else {
          console.error(e);
          throw e;
        }
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
  const setFileName = (): string => {
    const InputPicture: TPicture | undefined = watch("picture");
    if (InputPicture && InputPicture[0] != null) {
      return InputPicture[0].name.slice(0, 20);
    } else {
      return "画像を選択する";
    }
  };

  // fileをbase64にエンコード
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
      const file = target.files[0] as IFile;
      const reader = new FileReader();
      reader.onload = () => (file.data = reader.result);
      reader.readAsDataURL(file);
    }
  };
  // ここまでDiaryCreateDialogとDiaryEditで共通して使うやつ

  // ここから DiaryCreateDialogで使う関数
  // DiaryCreateDialogでFormのボタンが押されたらApiを叩く
  const onCreateSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING });
    createDiary({
      date: formValues.date,
      tag_list: formValues.tag_list ? formValues.tag_list.trim() : undefined,
      content: formValues.content,
      movie_source: formValues.movie_source
        ? formValues.movie_source
        : undefined,
      picture: formValues.picture ? formValues.picture[0] : undefined,
    })
      .then((data): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        setState({
          ...state,
          diaries: data.diaries,
          isOpenDiaryCreateDialog: false,
          pagy: data.pagy,
        });
      })
      .catch((e): void => {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        if (e.response.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
          setState({
            ...state,
            apiErrors: e.response.data.errors,
          });
        } else if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          setCurrentUser(undefined);
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          navigate("/login", { replace: true });
        } else {
          console.error(e);
          throw e;
        }
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
      apiErrors: undefined,
    });
  };
  // ここまでDiaryCreateDialogで使う関数

  // ここからDiaryEditで使う関数
  const onEditSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING });
    state.pagy &&
      state.selectedDiary &&
      updateDiary(
        {
          date: formValues.date,
          tag_list: formValues.tag_list
            ? formValues.tag_list.trim()
            : undefined,
          content: formValues.content,
          picture: formValues.picture ? formValues.picture[0] : undefined,
          movie_source: formValues.movie_source
            ? formValues.movie_source
            : undefined,
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
        })
        .catch((e): void => {
          dispatch({ type: submitActionTypes.POST_INITIAL });
          if (e.response.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
            setState({
              ...state,
              apiErrors: e.response.data.errors,
            });
          } else if (
            e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
            e.response.status === HTTP_STATUS_CODE.FORBIDDEN
          ) {
            setCurrentUser(undefined);
            Cookies.remove("uid");
            Cookies.remove("client");
            Cookies.remove("access-token");
            navigate("/login", { replace: true });
          } else {
            alert(e);
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
    });
  };

  const onPlayerReady: YouTubeProps["onReady"] = (
    e: YouTubeEvent<{ target: YouTubePlayer }>
  ): void => {
    e.target.pauseVideo();
  };
  // ここまでDiaryDialogで使う関数

  // ここからDiaryMenu(DiaryDialogに埋め込まれている)で使う関数
  const onOpenCofirmationDialog = (): void => {
    setState({
      ...state,
      isOpenConfirmDialog: true,
      anchorEl: null,
    });
  };

  const onCloseCofirmationDialog = (): void => {
    setState({
      ...state,
      isOpenConfirmDialog: false,
    });
  };

  // DiaryDialogで開かれている日記データを削除
  const onDiaryDelete = (diary: IDiary): void => {
    state.pagy &&
      deleteDiary(state.pagy.page, diary.id)
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
        })
        .catch((e): void => {
          if (
            e.response.status === HTTP_STATUS_CODE.FORBIDDEN ||
            e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED
          ) {
            setCurrentUser(undefined);
            Cookies.remove("uid");
            Cookies.remove("client");
            Cookies.remove("access-token");
            navigate("/login", { replace: true });
          } else {
            console.error(e);
            throw e;
          }
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
  const onMenuOpen = (e: React.MouseEvent<HTMLElement>): void => {
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

  // このコンポーネントが開かれた時にだけ実行される
  // ログアウトの処理で一回走ってるからくそ
  useEffect(() => {
    const abortController = new AbortController();
    setState({
      ...state,
      fetchState: REQUEST_STATE.LOADING,
    });
    fetchHome()
      .then((data): void => {
        setState({
          ...state,
          diaries: data.diaries,
          pagy: data.pagy,
          fetchState: REQUEST_STATE.OK,
        });
      })
      .catch((e): void => {
        if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          navigate("/login", { replace: true });
          setCurrentUser(undefined);
        } else {
          console.error(e);
        }
      });

    return () => abortController.abort();
  }, []);

  return (
    <LoginHomeWrapper ref={scrollIndexTopRef}>
      <Heading data-testid="pageTitle">Diaries</Heading>
      <DiaryCreateOpenButton
        onClick={onOpenDiaryCreateDialog}
        data-testid="diaryCreateOpenButton"
      >
        <IconWrapper>
          <CreateIcon fontSize={"small"} data-testid="createIcon" />
        </IconWrapper>
        日記作成
      </DiaryCreateOpenButton>
      <DrawerOpenButton
        onClick={onDrawerOpenButton(true)}
        data-testid="drawerOpenButton"
      >
        <IconWrapper>
          <SearchIcon fontSize={"small"} data-testid="SearchIcon" />
        </IconWrapper>
        Search
      </DrawerOpenButton>
      <DiarySearchDrawer
        control={control}
        selectedDate={state.selectedDate}
        isOpenDrawer={state.isOpenDrawer}
        onOpenButton={(open) => onDrawerOpenButton(open)}
        onClearButton={onSearchClearButton}
        onSubmit={handleSubmit(onWordSearchSubmit)}
        onDateChange={(date: Date | null): void => onDateChange(date)}
      />
      {state.fetchState === REQUEST_STATE.LOADING ? (
        <CircularProgressWrapper>
          <CircularProgress />
        </CircularProgressWrapper>
      ) : (
        <Fragment>
          {state.diaries?.length && state.pagy != null ? (
            <Fragment>
              <DiaryIndex
                diaries={state.diaries}
                onOpenDiaryDialog={onOpenDiaryDialog}
              />
              <PagenationArea onPageChange={onPageChange} pagy={state.pagy} />
            </Fragment>
          ) : (
            <EmptyMessageWrapper>
              <EmptyMessage>日記がありません</EmptyMessage>
            </EmptyMessageWrapper>
          )}
        </Fragment>
      )}
      {state.isOpenDiaryCreateDialog && (
        <DiaryCreateDialog
          apiErrors={state.apiErrors}
          contentCount={watch("content") ? watch("content", "").length : 0}
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
      )}
      {state.isOpenDiaryDialog && state.selectedDiary && (
        <DiaryDialog
          anchorEl={state.anchorEl}
          apiErrors={state.apiErrors}
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
          onPlayerReady={onPlayerReady}
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
    </LoginHomeWrapper>
  );
};
