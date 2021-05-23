import React, { VFC } from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
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
}

interface IDiaryCreateDialogProps {
  isOpen: boolean;
  control: any;
  errors: any;
  register: any;
  apiErrors?: IApiErrors;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  dateToday: string;
  setFileName: string | undefined;
  onSubmit(): void;
  onFileChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClose(): void;
}

export const DiaryCreateDialog:VFC<IDiaryCreateDialogProps> = ({
  isOpen,
  control,
  errors,
  register,
  apiErrors,
  onSubmitText,
  isDisabled,
  contentCount,
  dateToday,
  setFileName,
  onSubmit,
  onFileChange,
  onClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      data-testid='diaryCreateDialog'
    >
      <FromTitle data-testid='diaryCreateDialogTitle'>日記作成</FromTitle>
      <FormArea
        control={control}
        errors={errors}
        register={register}
        apiErrors={apiErrors}
        onSubmitText={onSubmitText}
        isDisabled={isDisabled}
        contentCount={contentCount}
        defaultDate={dateToday}
        defaultContent={''}
        setFileName={setFileName}
        onSubmit={onSubmit}
        onFileChange={onFileChange}
      />
    </Dialog>
  );
}