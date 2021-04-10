import React, {
  VFC,
  Fragment,
  useState,
  useEffect,
  useContext,
  useReducer,
 } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

// contexts
import { CurrentUserContext } from '../../contexts/CurrentUser';

// apis
import { fetchHome, getDiaies } from '../../apis/home';

// components
import { BaseButton } from '../../components/shared_style';
import { Diaries } from '../../components/Diaries';
import { DiaryCreateDialog } from '../../components/DiaryCreateDialog';
import { DiaryDialog } from '../../components/DiaryDialog';
import { PagenationArea } from '../../components/PagenationArea';

// responses
import { HTTP_STATUS_CODE } from '../../constants';

// helpers
import {
  dateToday,
  onSubmitLabel,
  isDisabled,
 } from '../../helpers';

// apis
import { createDiary, deleteDiary } from '../../apis/diaries';
// reducers
import {
  initialState as reducerInitialState,
  submitActionTypes,
  submitReducer,
} from '../../reducers/submit';

// css
const LoginHomeWrapper = styled.div`
  width: 90vw;
  height: auto;
  margin: 6.6vh auto 0 auto;
  padding-top: 2rem;
`;

const Heading = styled.h1`
  text-align: center;
  color: royalblue;
`;

const FormDialogButton = styled(BaseButton)`
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

// 型

interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string;
  user_id: number;
}

interface IApiErrors {
  date?: Array<string>;
  content?: Array<string>;
  picture?: Array<string>;
  full_messages: Array<string>;
}

interface IPagy {
  page: number;
  pages: number;
}

interface IInitialState {
  diaries: Array<IDiary> | undefined;
  apiErrors: IApiErrors | undefined;
  pagy: IPagy| undefined;
  selectedDiary: IDiary | null;
  isOpenDiaryCreateDialog: boolean;
  isOpenDiaryDialog: boolean;
  anchorEl: null | HTMLElement;
}


// Formから送信される情報
type TPicture = Array<{data:string, name: string}>;

interface IFormValues {
  date: string;
  content: string;
  picture?: TPicture;
}

type TClickHTMLElement = React.MouseEvent<HTMLElement>;

export const LoginHome: VFC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { handleSubmit, errors, control , watch, register} = useForm<IFormValues>();
  const [reducerState, dispatch] = useReducer(submitReducer, reducerInitialState);
  const initialState: IInitialState = {
    diaries: undefined,
    apiErrors: undefined,
    pagy: undefined,
    selectedDiary: null,
    isOpenDiaryCreateDialog: false,
    isOpenDiaryDialog: false,
    anchorEl: null,
  }
  const [state, setState] = useState(initialState);

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
        console.log("ユーザがログインしてへんで！");
      } else {
        throw e
      }
    })
  };
  // ここまでPagenationAreaで使う関数

  // ここから DiaryCreateDialogで使う関数
  // DiaryCreateDialogで選択されたfile名を返す()
  const setFileName = ():string => {
    const InputPicture:TPicture | undefined = watch("picture");
    if(InputPicture && InputPicture![0] != null){
      return InputPicture![0].name.slice(0, 20);
    } else{
      return "画像を追加する";
    }
  };

  // fileをbase64にエンコード
  const onFileChange = (event: any): void => {
    const file = event.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = () => file.data = (reader.result);
      reader.readAsDataURL(file);
    }
  };

  // DiaryCreateDialogでFormのボタンが押されたら使うやつ
  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING});
    createDiary(currentUser!.headers,
      {
        date: formValues.date,
        content: formValues.content,
        picture: formValues.picture? formValues.picture[0] : undefined,
      },
    )
    .then((data: any): void => {
      dispatch({ type: submitActionTypes.POST_INITIAL});
      setState({
        ...state,
        diaries: data.diaries,
        isOpenDiaryCreateDialog: false,
        pagy: data.pagy,
      })
      console.log(data)
    })
    .catch((e: any): void => {
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

  const diaryCreateDialogOpen = (): void => {
    setState({
      ...state,
      isOpenDiaryCreateDialog: true,
    })
  };

  const diaryCreateDialogClose = (): void => {
    setState({
      ...state,
      isOpenDiaryCreateDialog: false,
      apiErrors: undefined,
    })
  };

  // ここまでDiaryCreateDialogで使う関数

  // ここからDiaryDialogで使う
  // Diaries内でユーザがクリックした日記のデータを取得し、DiaryDialogへ投げる
  const onDiaryDialogOpen = (diary: IDiary): void=> {
    setState({
      ...state,
      selectedDiary: diary,
      isOpenDiaryDialog: true,
    })
  };

  const diaryDialogClose = (): void => {
    setState({
      ...state,
      isOpenDiaryDialog: false,
    })
  };

  // Menu
  const menuOpen = (event: TClickHTMLElement): void => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
    })
  };

  const onMenuClose = (): void => {
    setState({
      ...state,
      anchorEl: null,
    })
  };

  const onDeleteDiary = (diary: IDiary): void => {
    deleteDiary(currentUser!.headers, state.pagy!.page, diary.id)
    .then((data: any): void => {
      setState({
        ...state,
        diaries: data.diaries,
        pagy: data.pagy,
        anchorEl: null,
        isOpenDiaryDialog: false,
      })
    })
  };

  // ここまでDiaryDialogで使うやつ

  // このコンポーネントが開かれた時にだけ実行される
  useEffect((): void => {
    fetchHome(currentUser!.headers)
    .then(data =>{
      setState({
        ...state,
        diaries: data.diaries,
        pagy: data.pagy,
      })
    })
    .catch(e => {
      if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED){
        console.log("ユーザがログインしてへんで！");
      } else {
        throw e
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <LoginHomeWrapper>
      <Heading>Diary List</Heading>
      <FormDialogButton onClick={diaryCreateDialogOpen}>
        日記を作成する
      </FormDialogButton>
        {
          state.diaries != null  && state.pagy != null ?
          <Fragment>
            <PagenationArea
              pagy={state.pagy}
              onPageChange={(page: number):void => onPageChange(page)}
            />
            <Diaries
              diaries={state.diaries}
              onDiaryDialogOpen={(diary):void => onDiaryDialogOpen(diary)}
            />
          </Fragment>
        :
        <li>値がないよ</li>
        }
        {
          state.isOpenDiaryCreateDialog &&
          <DiaryCreateDialog
            isOpen={state.isOpenDiaryCreateDialog}
            handleSubmit={handleSubmit(onSubmit)}
            control={control}
            errors={errors}
            register={register}
            contentCount={watch("content","").length}
            dateToday={dateToday()}
            apiErrors={state.apiErrors}
            isDisabled={isDisabled(reducerState.postState)}
            setFileName={setFileName()}
            onSubmitLabel={onSubmitLabel(reducerState.postState, "日記作成")}
            onFileChange={onFileChange}
            onClose={diaryCreateDialogClose}
          />
        }
        {
          state.isOpenDiaryDialog && state.selectedDiary &&
          <DiaryDialog
            diary={state.selectedDiary}
            isOpen={state.isOpenDiaryDialog}
            currentUserId={currentUser!.data.id}
            anchorEl={state.anchorEl}
            menuOpen={(event: TClickHTMLElement): void => menuOpen(event)}
            onDeleteDiary={(diary: IDiary): void => onDeleteDiary(diary)}
            onMenuClose={onMenuClose}
            onClose={diaryDialogClose}
          />
        }
    </LoginHomeWrapper>
  );
}
