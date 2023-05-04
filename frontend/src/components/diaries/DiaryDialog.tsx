import { FC, Fragment } from "react";
import { Chip, Dialog } from "@mui/material";
import YouTube from "react-youtube";
import styled from "styled-components";

// components
import { DiaryMenu } from "./DiaryMenu";
import { DiaryEdit } from "./DiaryEdit";

// types
import { IDiaryDialogProps as IProps } from "../../types/components/diaries";

// css
const Date = styled.h1`
  text-align: center;
  color: limegreen;
  font-weight: normal;
  font-family: cursive, Century;
  width: 50%;
  margin: 0 auto 0.6rem auto;
`;

const Name = styled.h2`
  margin: 0.8rem auto 0.4rem 2rem;
  font-weight: normal;
  opacity: 0.6;
  color: limegreen;
`;

const TagWrapper = styled.span`
  display: inline-block;
  margin: 0 auto;
`;

const CoontentWrapper = styled.div`
  min-height: 30vh;
  margin: 0.5rem auto 2.5rem auto;
  width: 80%;
  border: 0.0125rem solid limegreen;
  border-radius: 0.5rem;
`;

const Content = styled.div`
  white-space: pre-line;
  word-wrap: break-word;
  padding: 4%;
  font-size: 1.2rem;
`;

const Picture = styled.img`
  display: flex;
  margin: 1rem auto;
  max-height: 95%;
  max-width: 95%;
  object-fit: scale-down;
`;
// Material Ui のChipデザイン変更
const style = {
  backgroundColor: "limegreen",
  color: "white",
  borderRadius: 5,
  margin: "0.3rem",
  fontSize: "1.2rem",
};
// 型

const opts = {
  width: "100%",
};

export const DiaryDialog: FC<IProps> = ({
  isOpen,
  isOpenDiaryEdit,
  diary,
  anchorEl,
  control,
  errors,
  resultErrors,
  isDisabled,
  onSubmitText,
  contentCount,
  setFileName,
  formattedDate,
  onEditSubmit,
  onFileChange,
  onOpenCofirmationDialog,
  onDiaryEditMode,
  onDiaryShowMode,
  onClose,
  onMenuOpen,
  onMenuClose,
  onPlayerReady,
  register,
}) => {
  const getVideoId = (url: string): string | undefined => {
    const match = url.match(
      /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?$/
    );
    return match ? match[1] : undefined;
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      data-testid="diaryDialog"
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
      {isOpenDiaryEdit ? (
        <DiaryEdit
          diary={diary}
          control={control}
          errors={errors}
          resultErrors={resultErrors}
          onSubmitText={onSubmitText}
          isDisabled={isDisabled}
          contentCount={contentCount}
          setFileName={setFileName}
          register={register}
          onEditSubmit={onEditSubmit}
          onFileChange={onFileChange}
        />
      ) : (
        <Fragment>
          <Date data-testid="diaryDate">{formattedDate(diary.date)}</Date>
          <TagWrapper>
            {diary.tag_list.map(
              (tag: string | undefined, index: number): JSX.Element => {
                return (
                  <Chip
                    label={tag}
                    color="primary"
                    key={`diary-tag-${index}`}
                    data-testid={`diaryTag-${index}`}
                    sx={style}
                  />
                );
              }
            )}
          </TagWrapper>
          <Name>Content</Name>
          <CoontentWrapper>
            <Content data-testid="diaryContent">{diary.content}</Content>
          </CoontentWrapper>
          {diary.picture_url && (
            <Fragment>
              <Name>Picture</Name>
              <Picture
                src={diary.picture_url}
                alt="日記画像"
                data-testid="diaryPicture"
              />
            </Fragment>
          )}
          {diary.movie_source && (
            <Fragment>
              <Name>Movie</Name>
              <YouTube
                videoId={getVideoId(diary.movie_source)}
                opts={opts}
                onReady={onPlayerReady}
              />
            </Fragment>
          )
          }
        </Fragment>
      )}
    </Dialog>
  );
};
