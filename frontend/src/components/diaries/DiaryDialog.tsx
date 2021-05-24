import React, { VFC, Fragment } from 'react';
import { Chip, Dialog } from '@material-ui/core';
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

const TagWrapper = styled.span`
  text-align: right;
  display: inline-block;
`;

const Tag = styled(Chip)`
  margin: .3rem;
`;

const PictureWrapper = styled.div`
  min-height: 15rem;
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

const Picture = styled.img`
  display: flex;
  margin: 1rem auto;
  max-height: 95%;
  max-width: 95%;
  object-fit: scale-down;
`;

// 型

interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string | null;
  tag_list: Array<string | null>;
  user_id: number;
}

interface IApiErrors {
  date?: Array<string>;
  tag_list?: Array<string>;
  content?: Array<string>;
  picture?: Array<string>;
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
  anchorEl: HTMLElement | null;
  onEditSubmit(): void;
  onOpenCofirmationDialog(): void;
  onDiaryEditMode(): void;
  onDiaryShowMode(): void;
  onFileChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClose(): void;
  onMenuOpen(e: React.MouseEvent<HTMLElement>): void;
  onMenuClose(): void;
}

export const DiaryDialog:VFC<IDiaryDialogProps> = ({
  isOpen,
  isOpenDiaryEdit,
  diary,
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
      maxWidth='sm'
      fullWidth
      data-testid='diaryDialog'
    >
      <DiaryMenu
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
            <Date data-testid='diaryDate'>{diary.date}</Date>
            <TagWrapper>
              {
                diary.tag_list.map((tag: string | null, index: number): JSX.Element => {
                  return (
                    <Tag
                      label={tag}
                      color='primary'
                      size='small'
                      key={`diary-tag-${index}`}
                      data-testid={`diaryTag-${index}`}
                    />
                  )
                })
              }
            </TagWrapper>
            <ContentHeading>Content</ContentHeading>
            <PictureWrapper>
              <Content data-testid='diaryContent'>{diary.content}</Content>
              {
                diary.picture_url &&
                <Picture
                  src={diary.picture_url} alt='日記画像'
                  data-testid='diaryPicture'
                />
              }
            </PictureWrapper>
          </Fragment>
      }
    </Dialog>
  );
}