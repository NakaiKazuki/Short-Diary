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
import { createDiary } from '../../apis/diaries';

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
  isOpenDiaryCreateDialog: boolean;
  apiErrors: IApiErrors | undefined;
  pagy: IPagy| undefined;
}

type TPicture = Array<{data:string, name: string}>;

// Formから送信される情報
interface IFormValues {
  date: string;
  content: string;
  picture?: TPicture;
}

export const LoginHome: VFC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { handleSubmit, errors, control , watch, register} = useForm<IFormValues>();
  const [reducerState, dispatch] = useReducer(submitReducer, reducerInitialState);
  const initialState: IInitialState = {
    diaries: undefined,
    isOpenDiaryCreateDialog: false,
    apiErrors: undefined,
    pagy: undefined,
  }
  const [state, setState] = useState(initialState);

  // DiaryCreateDialogで入力されたcontentの文字数を返す
  const contentCount = ():number => watch("content","").length;

  // DiaryCreateDialogで選択されたfile名を返す()
  const setFileName = ():string =>{
    const InputPicture:TPicture | undefined = watch("picture");
    if(InputPicture && InputPicture![0] != null){
      return InputPicture![0].name.slice(0, 20);
    } else{
      return "画像を追加する";
    }
  };

  // fileをbase64にエンコード
  const fileChange = (event: any): void => {
    const file = event.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = () => file.data = reader.result;
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
      }
    )
    .then((res: any): void => {
      dispatch({ type: submitActionTypes.POST_INITIAL});
      setState({
        ...state,
        diaries: res.data.diaries,
        isOpenDiaryCreateDialog: false,
      })
      console.log(res.data)
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

  // ページネションのページ番号が選択されたら、その番号に応じてデータを受け取る
  const onPageChange = (page: number): void => {
    getDiaies(currentUser!.headers,page)
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

  // このコンポーネントが開かれた時にだけ実行される
  useEffect((): void => {
    fetchHome(currentUser!.headers)
    .then(data =>{
      setState({
        ...state,
        diaries: data.diaries,
        pagy: data.pagy,
      })
      console.log(data.pagy)
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
      <FormDialogButton onClick={() => setState({
        ...state,
        isOpenDiaryCreateDialog: true,
      })}>
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
            dateToday={():string => dateToday()}
            contentCount={():number => contentCount()}
            fileChange={fileChange}
            apiErrors={state.apiErrors}
            isDisabled={():boolean => isDisabled(reducerState.postState)}
            onSubmitLabel={():string => onSubmitLabel(reducerState.postState, "日記作成")}
            setFileName={():string => setFileName()}
            onClose={():void => setState({
              ...state,
              isOpenDiaryCreateDialog: false,
              apiErrors: undefined,
            })}
          />
        }
    </LoginHomeWrapper>
  );
}
