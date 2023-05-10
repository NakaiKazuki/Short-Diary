import { FC, Fragment } from "react";
import styled from "styled-components";

// components
import { FormArea } from "./FormArea";

// types
import { IDiaryEditProps as IProps } from "../../types/components/diaries";

const FromTitle = styled.h1`
  text-align: center;
  color: limegreen;
  font-weight: normal;
  margin: 0;
  font-family: Comic Sans MS;
`;

export const DiaryEdit: FC<IProps> = ({
  diary,
  control,
  errors,
  resultErrors,
  onSubmitText,
  isDisabled,
  contentCount,
  setFileName,
  onEditSubmit,
  onFileChange,
  register,
}) => {
  return (
    <Fragment>
      <FromTitle data-testid="diaryEditTitle">日記編集</FromTitle>
      <FormArea
        control={control}
        errors={errors}
        register={register}
        resultErrors={resultErrors}
        onSubmitText={onSubmitText}
        isDisabled={isDisabled}
        contentCount={contentCount}
        defaultDate={diary.date}
        defaultTag={diary.tag_list.join(",")}
        defaultContent={diary.content}
        defaultMovieSource={diary.movie_source || ""}
        setFileName={setFileName}
        onSubmit={onEditSubmit}
        onFileChange={onFileChange}
      />
    </Fragment>
  );
};
