import React, { VFC, Fragment } from 'react';
import { Dialog } from '@material-ui/core';
import styled from 'styled-components';

// components
import { DiaryMenu } from './DiaryMenu';
import { DiaryEdit } from './DiaryEdit';
// css

const Date = styled.h2`
  text-align: center;
  color: royalblue;
  font-weight: normal;
  font-family: cursive, Century;
  width: 50%;
  margin: 0 auto .6rem auto;
`;

const ContentHeading = styled.h4`
  margin: 0 auto 0 5%;
  font-weight: normal;
  opacity: .6;
  color: mediumblue;
`;

const ContentImageWrapper = styled.div`
  min-height: 20rem;
  height: auto;
  margin: .5rem auto 2.5rem auto;
  width: 80%;
  border: .0125rem solid green;
  border-radius: .5rem;
`;


const Content = styled.div`
  white-space: pre-line;
  word-wrap: break-word;
  padding: 4% 4% 0 4%;
`;

const Image = styled.img`
  display: flex;
  margin: 1rem auto;
  height: 95%;
  width: 95%;
`;

// 型
type TClickHTMLElement = React.MouseEvent<HTMLElement>;

interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string;
  user_id: number;
}

type TApiError = Array<string>;

interface IApiErrors {
  date?: TApiError;
  content?: TApiError;
  picture?: TApiError;
  full_messages: TApiError;
}

interface IDiaryDialogProps {
  isOpen: boolean;
  isOpenDiaryEdit: boolean;
  control: any;
  errors: any;
  register: any;
  apiErrors?: IApiErrors;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  setFileName: string | undefined;
  diary: IDiary;
  currentUserId: number;
  anchorEl: HTMLElement | null;
  onEditSubmit(): void;
  onOpenCofirmationDialog(): void;
  onDiaryEditMode(): void;
  onDiaryShowMode(): void;
  onFileChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClose(): void;
  onMenuOpen(e: TClickHTMLElement): void;
  onMenuClose(): void;
}

export const DiaryDialog:VFC<IDiaryDialogProps> = ({
  isOpen,
  isOpenDiaryEdit,
  diary,
  currentUserId,
  anchorEl,
  control,
  errors,
  register,
  apiErrors,
  isDisabled,
  onSubmitText,
  contentCount,
  setFileName,
  onEditSubmit,
  onFileChange,
  onOpenCofirmationDialog,
  onDiaryEditMode,
  onDiaryShowMode,
  onClose,
  onMenuOpen,
  onMenuClose,
}) => {
  return(
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={'sm'}
      fullWidth
    >
      <DiaryMenu
        diary={diary}
        currentUserId={currentUserId}
        anchorEl={anchorEl}
        isOpenDiaryEdit={isOpenDiaryEdit}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        onDiaryShowMode={onDiaryShowMode}
        onDiaryEditMode={onDiaryEditMode}
        onOpenCofirmationDialog={onOpenCofirmationDialog}
      />
      {
        isOpenDiaryEdit ?
          <DiaryEdit
            diary={diary}
            control={control}
            errors={errors}
            register={register}
            apiErrors={apiErrors}
            onSubmitText={onSubmitText}
            isDisabled={isDisabled}
            contentCount={contentCount}
            setFileName={setFileName}
            onEditSubmit={onEditSubmit}
            onFileChange={onFileChange}
          />
        :
          <Fragment>
            <Date>{diary.date}</Date>
            <ContentHeading>Content</ContentHeading>
            <ContentImageWrapper>
              <Content>{diary.content}</Content>
              {
                diary.picture_url &&
                <Image
                  src={diary.picture_url} alt='日記画像'
                />
              }
            </ContentImageWrapper>
          </Fragment>
      }
    </Dialog>
  );
}