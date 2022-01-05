import React, { VFC } from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import styled from "styled-components";

// components
import { BaseButton } from "../shared_style";
import { AddPictureIcon } from "../Icons";

const FormWrapper = styled.form`
  padding: 0 10% 5% 10%;
`;

const FormItemWrapper = styled.div`
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  text-align: center;
  margin: 0.4rem auto;
  color: red;
  font-size: 0.9rem;
`;

const ContentCount = styled.span`
  float: right;
  font-size: 1rem;
`;

const Submit = styled(BaseButton)`
  margin-top: 2rem;
  background-color: royalblue;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
`;

const Picture = styled.label`
  width: 100%;
  text-align: center;
  padding: 0.6rem 0;
  color: royalblue;
  background-color: white;
  border: 0.0125rem solid royalblue;
  border-radius: 1rem;
  display: inline-block;
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

// 型

// エラーメッセージ
type TApiError = Array<string>;

interface IApiErrors {
  date?: TApiError;
  tag_list?: TApiError;
  content?: TApiError;
  picture?: TApiError;
}
interface IFormAreaProps {
  control: any;
  errors: any;
  register: any;
  apiErrors: IApiErrors | undefined;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  defaultDate: string;
  defaultTag: string;
  defaultContent: string;
  setFileName: string | undefined;
  onSubmit(): void;
  onFileChange(e: any): void;
}

export const FormArea: VFC<IFormAreaProps> = ({
  control,
  errors,
  register,
  apiErrors,
  onSubmitText,
  isDisabled,
  contentCount,
  defaultDate,
  defaultTag,
  defaultContent,
  setFileName,
  onSubmit,
  onFileChange,
}) => {
  return (
    <FormWrapper onSubmit={onSubmit} data-testid="diaryForm">
      <FormItemWrapper data-testid="FormItem-date">
        {apiErrors?.date?.map((message: string, index: number) => (
          <ErrorMessage
            key={`date-${index}`}
            data-testid="dateApiError"
          >{`日付${message}`}</ErrorMessage>
        ))}
        <Controller
          name="date"
          control={control}
          defaultValue={defaultDate}
          rules={{ required: true, pattern: /(\d{4})-(\d{2})-(\d{2})/ }}
          render={({ field }) => (
            <TextField
              label="Date"
              type="date"
              inputProps={{
                "data-testid": "dateArea",
              }}
              {...field}
            />
          )}
        />
      </FormItemWrapper>

      <FormItemWrapper data-testid="FormItem-tag_list">
        {apiErrors?.tag_list?.map((message: string, index: number) => (
          <ErrorMessage
            key={`tag_list-${index}`}
            data-testid="tag_listApiError"
          >{`タグ${message}`}</ErrorMessage>
        ))}
        <Controller
          name="tag_list"
          control={control}
          defaultValue={defaultTag}
          render={({ field }) => (
            <TextField
              label="Tag"
              type="textarea"
              placeholder="「,」で複数設定 Tag1,Tag2,Tag3..."
              fullWidth
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
        {apiErrors?.content?.map((message: string, index: number) => (
          <ErrorMessage
            key={`content-${index}`}
            data-testid="contentApiError"
          >{`日記内容${message}`}</ErrorMessage>
        ))}
        <Controller
          name="content"
          control={control}
          rules={{ required: true, maxLength: 200 }}
          defaultValue={defaultContent}
          render={({ field }) => (
            <TextField
              label="Content"
              type="textarea"
              autoFocus={true}
              rows="8"
              placeholder="200文字以内で日記の内容を入力してください"
              multiline
              fullWidth
              helperText={
                <ContentCount data-testid="contentCount">
                  {contentCount}/200
                </ContentCount>
              }
              inputProps={{
                "data-testid": "contentArea",
              }}
              {...field}
            />
          )}
        />
      </FormItemWrapper>

      <FormItemWrapper data-testid="FormItem-picture">
        {apiErrors?.picture?.map((message: string, index: number) => (
          <ErrorMessage
            key={`picture-${index}`}
            data-testid="pictureApiError"
          >{`画像${message}`}</ErrorMessage>
        ))}
        <Picture>
          <AddPictureIcon />
          <FileNameArea>{setFileName}</FileNameArea>
          <InputPictureArea
            {...register("picture", {
              onChange: onFileChange,
            })}
            type="file"
            accept="image/*,.png,.jpg,.jpeg,.gif"
            data-testid="pictureArea"
          />
        </Picture>
      </FormItemWrapper>

      <Submit type="submit" disabled={isDisabled} data-testid="formSubmit">
        {onSubmitText}
      </Submit>
    </FormWrapper>
  );
};
