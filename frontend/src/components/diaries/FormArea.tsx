import { FC, Fragment } from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import styled from "styled-components";

// components
import { BaseButton, ColorRed } from "../shared_style";

// icons
import { SubmitIcon } from "../icon";

// icons
import { AddPictureIcon } from "../icon";

// types
import { IFormAreaProps as IProps } from "../../types/components/diaries";

// helper
import { isError } from "../../helpers";

const Form = styled.form`
  padding: 0 10% 5% 10%;
`;

const FormItemWrapper = styled.div`
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0.4rem auto;
`;

const ContentCount = styled.span<{ contentCount: number }>(({ contentCount }) => ({
  float: 'right',
  fontSize: '1rem',
  color: contentCount > 200 ? 'red' : undefined,
}));


const Picture = styled.label`
  background-color: white;
  border-radius: 1rem;
  border: 0.0125rem solid limegreen;
  color: limegreen;
  display: inline-block;
  padding: 0.6rem 0;
  text-align: center;
  width: 100%;
  :hover {
    cursor: pointer;
  }
`;

const FileNameArea = styled.span`
  margin-left: 0.6rem;
`;

const InputPictureArea = styled.input`
  display: none;
`;

const Submit = styled(BaseButton)`
  background-color: limegreen;
  border-style: none;
  color: white;
  font-size: 1.1rem;
  height: 3rem;
  margin-top: 2rem;
  width: 100%;
`;

const StyledSubmitIcon = styled(SubmitIcon)`
  margin-right: 0.6rem;
`;

const bgcWhite = { backgroundColor: "white" };

const moviePattern =
  /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?$/;

export const FormArea: FC<IProps> = ({
  control,
  errors,
  resultErrors,
  onSubmitText,
  isDisabled,
  contentCount,
  defaultDate,
  defaultTag,
  defaultContent,
  defaultMovieSource,
  setFileName,
  register,
  onSubmit,
  onFileChange,
}) => {
  return (
    <Form onSubmit={onSubmit} data-testid="diaryForm">
      <FormItemWrapper data-testid="FormItem-date">
        {resultErrors?.date?.map((message: string, index: number) => (
          <ErrorMessage
            key={`date-${index}`}
            data-testid="dateResultError"
          >{`日付${message}`}</ErrorMessage>
        ))}
        <Controller
          name="date"
          control={control}
          defaultValue={defaultDate}
          rules={{ required: true, pattern: /(\d{4})-(\d{2})-(\d{2})/ }}
          shouldUnregister
          render={({ field }) => (
            <TextField
              type="date"
              error={isError(resultErrors?.date)}
              sx={bgcWhite}
              {...field}
              label={
                <Fragment>
                  <ColorRed>*</ColorRed>Date
                </Fragment>
              }
              inputProps={{
                "data-testid": "dateArea",
              }}
            />
          )}
        />
      </FormItemWrapper>

      <FormItemWrapper data-testid="FormItem-tag_list">
        {resultErrors?.tag_list?.map((message: string, index: number) => (
          <ErrorMessage
            key={`tag_list-${index}`}
            data-testid="tag_listResultError"
          >{`タグ${message}`}</ErrorMessage>
        ))}
        <Controller
          name="tag_list"
          control={control}
          defaultValue={defaultTag}
          shouldUnregister
          render={({ field }) => (
            <TextField
              label="Tag"
              type="textarea"
              error={isError(resultErrors?.tag_list)}
              placeholder="半角カンマ(,)で複数設定 Tag1,Tag2,Tag3..."
              fullWidth
              multiline
              sx={bgcWhite}
              inputProps={{
                "data-testid": "tag_listArea",
              }}
              {...field}
            />
          )}
        />
      </FormItemWrapper>

      <FormItemWrapper data-testid="FormItem-content">
        {errors?.content && (
          <ErrorMessage data-testid="contentErrorMessage">
            1文字以上、200文字以内で入力してください
          </ErrorMessage>
        )}
        {resultErrors?.content?.map((message: string, index: number) => (
          <ErrorMessage
            key={`content-${index}`}
            data-testid="contentResultError"
          >{`日記内容${message}`}</ErrorMessage>
        ))}
        <Controller
          name="content"
          control={control}
          rules={{ required: true, maxLength: 200 }}
          defaultValue={defaultContent}
          shouldUnregister
          render={({ field }) => (
            <TextField
              label={
                <Fragment>
                  <ColorRed>*</ColorRed>Content
                </Fragment>
              }
              type="textarea"
              error={isError(errors?.content || resultErrors?.content)}
              autoFocus={true}
              minRows="8"
              placeholder="200文字以内で日記の内容を入力してください"
              multiline
              fullWidth
              sx={bgcWhite}
              helperText={
                <ContentCount contentCount={contentCount} data-testid="contentCount">
                  {contentCount}/200
                </ContentCount>
              }
              inputProps={{
                ref: { register },
                "data-testid": "contentArea",
              }}
              {...field}
            />
          )}
        />
      </FormItemWrapper>

      <FormItemWrapper data-testid="FormItem-movie_source">
        {errors?.movie_source && (
          <ErrorMessage data-testid="movie_sourceErrorMessage">
            Youtube動画のURLを入力してください
          </ErrorMessage>
        )}
        {resultErrors?.movie_source?.map((message: string, index: number) => (
          <ErrorMessage
            key={`movie_source-${index}`}
            data-testid="movie_sourceResultError"
          >{`動画URL${message}`}</ErrorMessage>
        ))}
        <Controller
          name="movie_source"
          control={control}
          rules={{
            maxLength: 255,
            pattern: moviePattern,
          }}
          defaultValue={defaultMovieSource}
          shouldUnregister
          render={({ field }) => (
            <TextField
              label="YouTube URL"
              type="textarea"
              error={isError(
                errors?.movie_source || resultErrors?.movie_source
              )}
              placeholder="https://www.youtube.com/watch?v=example"
              fullWidth
              multiline
              sx={bgcWhite}
              inputProps={{
                "data-testid": "movie_sourceArea",
              }}
              {...field}
            />
          )}
        />
      </FormItemWrapper>

      <FormItemWrapper data-testid="FormItem-picture">
        {resultErrors?.picture?.map((message: string, index: number) => (
          <ErrorMessage
            key={`picture-${index}`}
            data-testid="pictureResultError"
          >{`画像${message}`}</ErrorMessage>
        ))}
        <Picture>
          <AddPictureIcon />
          <FileNameArea>{setFileName}</FileNameArea>
          <InputPictureArea
            {...register("picture", {
              onChange: onFileChange,
              shouldUnregister: true,
            })}
            type="file"
            accept="image/*,.png,.jpg,.jpeg,.gif"
            id="pictureArea"
            data-testid="pictureArea"
          />
        </Picture>
      </FormItemWrapper>

      <Submit type="submit" disabled={isDisabled} data-testid="formSubmit">
        <StyledSubmitIcon />
        {onSubmitText}
      </Submit>
    </Form>
  );
};
