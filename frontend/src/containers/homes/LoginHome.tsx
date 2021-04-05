import React, {
  VFC ,
  useState,
  useEffect,
  useContext } from 'react';
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
import { dateToday } from '../../helpers';
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

// Formから送信される情報
interface IFormValues {
  date: string;
  content: string;
}

interface IDiary {
  date: string;
  content: string;
  picture_url: string | null;
  user_id: number;
}

interface IInitialState {
  diaries: Array<IDiary> | undefined;
  isOpenDiaryCreateDialog: boolean;
}


export const LoginHome: VFC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { handleSubmit, formState:{errors}, control , watch} = useForm<IFormValues>();
  const initialState: IInitialState = {
    diaries: undefined,
    isOpenDiaryCreateDialog: false,
  }
  const [state, setState] = useState(initialState);

  const onSubmit = () => {
    console.log("ボタン押されたで");
  }

  const contentCount = () => {
    const value = watch("content","");
    return value.length;
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
            dateToday={() => dateToday()}
            contentCount={contentCount()}
            onClose={() => setState({
              ...state,
              isOpenDiaryCreateDialog: false,
            })}
          />
        }
    </LoginHomeWrapper>
  );
}
