import React, {
  VFC ,
  useState,
  useEffect,
  useContext,
  useReducer } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

// contexts
import { CurrentUserContext } from '../../contexts/CurrentUser';

// apis
import { fetchHome } from '../../apis/home';

// components
import { BaseButton } from '../../components/shared_style';
import { Diaries } from '../../components/Diaries';
import { DiaryCreateDialog } from '../../components/DiaryCreateDialog';

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
  margin: 6.6vh auto 0 auto;
  padding-top: 2rem;
`;

const Heading = styled.h1`
  text-align: center;
`;

const FormDialogButton = styled(BaseButton)`
  height: 2.5rem;
  width: 10rem;
  border: .0125rem solid royalblue;
  letter-spacing: .2rem;
  color: white;
  font-size: 0.95rem;
  background-color: royalblue;
  :hover {
    background-color: white;
    color: royalblue;
  }
  @media screen and (max-width:480px) {
    width: 100%;
  }
`;

// 型

interface IDiary {
  date: string;
  content: string;
  picture_url: string | null;
  user_id: number;
}

// エラーメッセージ
interface IApiErrors {
  date?: Array<string>;
  content?: Array<string>;
  picture?: Array<string>;
  full_messages: Array<string>;
}

interface IInitialState {
  diaries: Array<IDiary> | undefined;
  isOpenDiaryCreateDialog: boolean;
  apiErrors: IApiErrors| undefined;
}

// Formから送信される情報
interface IFormValues {
  date: string;
  content: string;
  picture?: string;
}

export const LoginHome: VFC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { handleSubmit, formState:{errors}, control , watch} = useForm<IFormValues>();
  const [reducerState, dispatch] = useReducer(submitReducer, reducerInitialState);
  const initialState: IInitialState = {
    diaries: undefined,
    isOpenDiaryCreateDialog: false,
    apiErrors: undefined,
  }
  const [state, setState] = useState(initialState);

  // Dialogのcontent欄の入力値を数える
  const contentCount = () => {
    const value = watch("content","");
    return value.length;
  };

  const onSubmit = (formValues: IFormValues): void => {
    dispatch({ type: submitActionTypes.POSTING});
    createDiary(currentUser!.headers,
      {
        date: formValues.date,
        content: formValues.content,
        picture: formValues.picture,
      }
    )
    .then((res: any): void => {
      dispatch({ type: submitActionTypes.POST_INITIAL});
      setState({
        ...state,
        diaries: res.data.diaries,
      })
    })
    .catch((e: any): void => {
      if (e.response.status === HTTP_STATUS_CODE.UNPROCESSABLE) {
        dispatch({ type: submitActionTypes.POST_INITIAL });
        setState({
          ...state,
          apiErrors: e.response.data.errors
        });
      } else {
        throw e;
      }
    });
  };

  useEffect((): void => {
    fetchHome(currentUser!.headers)
    .then(data =>
      setState({
        ...state,
        diaries: data.diaries,
      })
    )
    .catch(e => {
      if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED){
        console.log("ユーザがログインしてへんで！");
      } else {
        throw e
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentUser]);

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
          state.diaries != null ?
            <Diaries
              diaries={state.diaries}
            />
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
            apiErrors={state.apiErrors}
            dateToday={() => dateToday()}
            contentCount={contentCount()}
            isDisabled={() => isDisabled(reducerState.postState)}
            onSubmitLabel={() => onSubmitLabel(reducerState.postState, "日記作成")}
            onClose={() => setState({
              ...state,
              isOpenDiaryCreateDialog: false,
            })}
          />
        }
    </LoginHomeWrapper>
  );
}
