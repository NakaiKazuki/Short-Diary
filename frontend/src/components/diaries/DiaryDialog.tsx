import { FC, Fragment } from "react";
import { Chip, Dialog } from "@material-ui/core";
import YouTube from "react-youtube";
import styled from "styled-components";

// components
import { DiaryMenu } from "./DiaryMenu";
import { DiaryEdit } from "./DiaryEdit";

// types
import { IDiaryDialogProps as IProps } from "../../types/components/diaries";

// css
const Date = styled.h2`
  text-align: center;
  color: royalblue;
  font-weight: normal;
  font-family: cursive, Century;
  width: 50%;
  margin: 0 auto 0.6rem auto;
`;

const ContentHeading = styled.h4`
  margin: 0 auto 0 5%;
  font-weight: normal;
  opacity: 0.6;
  color: mediumblue;
`;

const TagWrapper = styled.span`
  display: inline-block;
`;

const Tag = styled(Chip)`
  margin: 0.3rem;
`;

const ItemsWrapper = styled.div`
  min-height: 15rem;
  margin: 0.5rem auto 2.5rem auto;
  width: 80%;
  border: 0.0125rem solid green;
  border-radius: 0.5rem;
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

const opts = {
  height: "390",
  width: "600",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
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
                  <Tag
                    label={tag}
                    color="primary"
                    size="small"
                    key={`diary-tag-${index}`}
                    data-testid={`diaryTag-${index}`}
                  />
                );
              }
            )}
          </TagWrapper>
          <ContentHeading>Content</ContentHeading>
          <ItemsWrapper>
            <Content data-testid="diaryContent">{diary.content}</Content>
            {diary.picture_url && (
              <Picture
                src={diary.picture_url}
                alt="日記画像"
                data-testid="diaryPicture"
              />
            )}
          </ItemsWrapper>
          {diary.movie_source && (
            <YouTube
              videoId={diary.movie_source.split("v=")[1]}
              opts={opts}
              onReady={onPlayerReady}
            />
          )}
        </Fragment>
      )}
    </Dialog>
  );
};
