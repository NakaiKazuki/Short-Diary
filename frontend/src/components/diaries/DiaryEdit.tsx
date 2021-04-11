import React, { VFC, Fragment } from 'react';
import { DialogTitle } from '@material-ui/core';
import styled from 'styled-components';

// components
import { FormArea } from './FromArea';

const FromTitle = styled(DialogTitle)`
  text-align: center;
  color: royalblue;
  font-weight: bolder;
`;

// 型
// エラーメッセージ
type TApiError = Array<string>;

interface IApiErrors {
  date?: TApiError;
  content?: TApiError;
  picture?: TApiError;
  full_messages: TApiError;
}

interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string;
  user_id: number;
}

interface IDiaryEditProps {
  diary: IDiary;
  control: any;
  errors: any;
  register: any;
  apiErrors?: IApiErrors;
  onSubmitLabel: string;
  isDisabled: boolean;
  contentCount: number;
  setFileName: string | undefined;
  onSubmit(): void;
  onFileChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const DiaryEdit:VFC<IDiaryEditProps> = ({
  diary,
  control,
  errors,
  register,
  apiErrors,
  onSubmitLabel,
  isDisabled,
  contentCount,
  setFileName,
  onSubmit,
  onFileChange,
}) => {
  return (
    <Fragment>
      <FromTitle>日記編集</FromTitle>
      <FormArea
        control={control}
        errors={errors}
        register={register}
        apiErrors={apiErrors}
        onSubmitLabel={onSubmitLabel}
        isDisabled={isDisabled}
        contentCount={contentCount}
        defaultDate={diary.date}
        defaultContent={diary.content}
        setFileName={setFileName}
        onSubmit={onSubmit}
        onFileChange={onFileChange}
      />
    </Fragment>
  );
}