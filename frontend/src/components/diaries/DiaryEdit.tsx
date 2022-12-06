import { FC, Fragment } from "react";
import { DialogTitle } from "@material-ui/core";
import { FieldErrors, UseFormRegister, Control } from "react-hook-form";
import styled from "styled-components";

// components
import { FormArea } from "./FromArea";

const FromTitle = styled(DialogTitle)`
  text-align: center;
  color: royalblue;
  font-weight: bolder;
`;

// 型
interface IErrors {
  content: string;
  movie_source: string;
}

interface IApiErrors {
  date?: Array<string>;
  tag_list?: Array<string>;
  content?: Array<string>;
  picture?: Array<string>;
}

interface IDiary {
  id: number;
  date: string;
  tag_list: Array<string | undefined>;
  content: string;
  picture_url: string | undefined;
  movie_source: string | undefined;
  user_id: number;
}

type TPicture = Array<{ data: string; name: string }>;
interface IFormValues {
  date: string;
  tag_list: string | undefined;
  content: string;
  picture: TPicture | undefined;
  movie_source: string;
  searchWord: string | undefined;
}

interface IDiaryEditProps {
  diary: IDiary;
  control: Control<IFormValues>;
  errors: FieldErrors<IErrors>;
  apiErrors: IApiErrors | undefined;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  setFileName: string | undefined;
  register: UseFormRegister<IFormValues>;
  onEditSubmit(): void;
  onFileChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const DiaryEdit: FC<IDiaryEditProps> = ({
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
      <FromTitle data-testid="diaryEditTitle">日記編集</FromTitle>
      <FormArea
        control={control}
        errors={errors}
        register={register}
        apiErrors={apiErrors}
        onSubmitText={onSubmitText}
        isDisabled={isDisabled}
        contentCount={contentCount}
        defaultDate={diary.date}
        defaultTag={diary.tag_list.join(",")}
        defaultContent={diary.content}
        defaultmovie_source={diary.movie_source ? diary.movie_source : ""}
        setFileName={setFileName}
        onSubmit={onEditSubmit}
        onFileChange={onFileChange}
      />
    </Fragment>
  );
};
