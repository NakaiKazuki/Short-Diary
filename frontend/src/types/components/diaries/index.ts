import React from "react";
import { FieldErrors, UseFormRegister, Control } from "react-hook-form";
import { YouTubeEvent } from "react-youtube";

// diaries
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

export interface IDiaryCreateDialogProps {
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

interface IErrors {
  content: string;
  movie_source: string;
}

export interface IDiary {
  id: number;
  date: string;
  tag_list: Array<string | undefined>;
  content: string;
  picture_url: string | undefined;
  movie_source: string | undefined;
  user_id: number;
}

export interface IDiaryDialogProps {
  isOpen: boolean;
  isOpenDiaryEdit: boolean;
  control: Control<IFormValues>;
  errors: FieldErrors<IErrors>;
  apiErrors: IApiErrors | undefined;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  setFileName: string | undefined;
  diary: IDiary;
  anchorEl: HTMLElement | null;
  register: UseFormRegister<IFormValues>;
  onEditSubmit(): void;
  onOpenCofirmationDialog(): void;
  onDiaryEditMode(): void;
  onDiaryShowMode(): void;
  onFileChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onClose(): void;
  onMenuOpen(e: React.MouseEvent<HTMLElement>): void;
  onMenuClose(): void;
  onPlayerReady(e: YouTubeEvent<HTMLElement>): void;
}

export interface IDiaryEditProps {
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

export interface IDiariesProps {
  diaries: Array<IDiary>;
  onOpenDiaryDialog(diary: IDiary): void;
}

export interface IDiaryMenuProps {
  anchorEl: HTMLElement | null;
  isOpenDiaryEdit: boolean;
  onMenuOpen(e: React.MouseEvent<HTMLElement>): void;
  onMenuClose(): void;
  onOpenCofirmationDialog(): void;
  onDiaryEditMode(): void;
  onDiaryShowMode(): void;
}

export interface IDiarySearchDrawerProps {
  control: Control<IFormValues>;
  selectedDate: null | Date;
  isOpenDrawer: boolean;
  onOpenButton(open: boolean): React.ReactEventHandler;
  onClearButton(): void;
  onDateChange(date: Date | null): void;
  onSubmit(): void;
}

export interface IFormAreaProps {
  control: Control<IFormValues>;
  errors: FieldErrors<IErrors>;
  apiErrors: IApiErrors | undefined;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  defaultDate: string;
  defaultTag: string;
  defaultContent: string;
  defaultmovie_source: string;
  setFileName: string | undefined;
  register: UseFormRegister<IFormValues>;
  onSubmit(): void;
  onFileChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
