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
const Container = styled.div`
  width: 90%;
  margin: 0 auto 1rem auto;
`;

const Date = styled.h1`
  color: limegreen;
  font-family: Comic Sans MS;
  text-align: center;
  margin: 0;
`;

const Name = styled.h2`
  color: limegreen;
`;

const TagsArea = styled.div`
  text-align: center;
`;

const TagsWrapper = styled.span`
  display: inline-block;
`;

const ContentWrapper = styled.div`
  min-height: 30vh;
  margin: 0.5rem auto;
  border-radius: 0.5rem;
  border: 1px solid #d5d6da;
  box-shadow: 2px 2px 4px gray;
`;

const Content = styled.div`
  white-space: pre-line;
  word-wrap: break-word;
  padding: 4%;
  font-size: 1.3rem;
  color: #333;
  opacity: 0.9;
`;

const Picture = styled.img`
  display: flex;
  object-fit: scale-down;
  width: 100%;
  border: 1px solid #d5d6da;
  box-shadow: 2px 2px 4px gray;
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
    //YoutubeのvideoID取得 watch?v=wSTbdqo-j74 のwSTbdqo-j74を取り出してる
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
        <Container>
          <Date data-testid="diaryDate">{formattedDate(diary.date)}</Date>
          {diary.tag_list.length > 0 && (
            <TagsArea>
              <TagsWrapper>
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
              </TagsWrapper>
            </TagsArea>
          )}
          <Name> Content</Name>
          <ContentWrapper>
            <Content data-testid="diaryContent">{diary.content}</Content>
          </ContentWrapper>
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
          )}
        </Container>
      )}
    </Dialog>
  );
};
