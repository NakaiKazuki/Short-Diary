import { FC } from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import styled from "styled-components";
import { FieldErrors, UseFormRegister, Control } from "react-hook-form";
// components
import { FormArea } from "./FromArea";

const FromTitle = styled(DialogTitle)`
  text-align: center;
  color: royalblue;
  font-weight: bolder;
`;

// 型
// エラーメッセージ
interface IErrors {
  content: string;
  movie_source: string;
}

interface IApiErrors {
  date?: Array<string>;
  tag_list?: Array<string>;
  content?: Array<string>;
  picture?: Array<string>;
  movie_source?: Array<string>;
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

interface IDiaryCreateDialogProps {
  isOpen: boolean;
  control: Control<IFormValues>;
  errors: FieldErrors<IErrors>;
  apiErrors: IApiErrors | undefined;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  dateToday: string;
  setFileName: string | undefined;
  register: UseFormRegister<IFormValues>;
  onSubmit(): void;
  onFileChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onClose(): void;
}

export const DiaryCreateDialog: FC<IDiaryCreateDialogProps> = ({
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
      maxWidth="sm"
      fullWidth
      data-testid="diaryCreateDialog"
    >
      <FromTitle data-testid="diaryCreateDialogTitle">日記作成</FromTitle>
      <FormArea
        control={control}
        errors={errors}
        register={register}
        apiErrors={apiErrors}
        onSubmitText={onSubmitText}
        isDisabled={isDisabled}
        contentCount={contentCount}
        defaultDate={dateToday}
        defaultTag={""}
        defaultContent={""}
        defaultmovie_source={""}
        setFileName={setFileName}
        onSubmit={onSubmit}
        onFileChange={onFileChange}
      />
    </Dialog>
  );
};
