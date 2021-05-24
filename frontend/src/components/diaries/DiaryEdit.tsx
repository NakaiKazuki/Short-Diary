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
interface IApiErrors {
  date?: Array<string>;
  tag_list?: Array<string>;
  content?: Array<string>;
  picture?: Array<string>;
}

interface IDiary {
  id: number;
  date: string;
  tag_list: Array<string | null>;
  content: string;
  picture_url: string | null;
  user_id: number;
}

interface IDiaryEditProps {
  diary: IDiary;
  control: any;
  errors: any;
  register: any;
  apiErrors?: IApiErrors;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  setFileName: string | undefined;
  onEditSubmit(): void;
  onFileChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const DiaryEdit:VFC<IDiaryEditProps> = ({
  diary,
  control,
  errors,
  register,
  apiErrors,
  onSubmitText,
  isDisabled,
  contentCount,
  setFileName,
  onEditSubmit,
  onFileChange,
}) => {
  return (
    <Fragment>
      <FromTitle data-testid='diaryEditTitle'>日記編集</FromTitle>
      <FormArea
        control={control}
        errors={errors}
        register={register}
        apiErrors={apiErrors}
        onSubmitText={onSubmitText}
        isDisabled={isDisabled}
        contentCount={contentCount}
        defaultDate={diary.date}
        defaultTag={diary.tag_list.join(',')}
        defaultContent={diary.content}
        setFileName={setFileName}
        onSubmit={onEditSubmit}
        onFileChange={onFileChange}
      />
    </Fragment>
  );
}