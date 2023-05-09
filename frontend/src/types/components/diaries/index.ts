import { ChangeEvent, MouseEvent, ReactEventHandler } from "react";
import { FieldErrors, UseFormRegister, Control } from "react-hook-form";
import { YouTubeEvent } from "react-youtube";

// diaries
interface IErrors {
  content: string;
  movie_source: string;
}

interface IResultErrors {
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
  resultErrors: IResultErrors | undefined;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  dateToday: string;
  setFileName: string | undefined;
  register: UseFormRegister<IFormValues>;
  onSubmit(): void;
  onFileChange(e: ChangeEvent<HTMLInputElement>): void;
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
  resultErrors: IResultErrors | undefined;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  setFileName: string | undefined;
  diary: IDiary;
  anchorEl: HTMLElement | null;
  formattedDate(diaryDate: string): string;
  register: UseFormRegister<IFormValues>;
  onEditSubmit(): void;
  onOpenCofirmationDialog(): void;
  onDiaryEditMode(): void;
  onDiaryShowMode(): void;
  onFileChange(e: ChangeEvent<HTMLInputElement>): void;
  onClose(): void;
  onMenuOpen(e: MouseEvent<HTMLElement>): void;
  onMenuClose(): void;
  onPlayerReady(e: YouTubeEvent<HTMLElement>): void;
}

export interface IDiaryEditProps {
  diary: IDiary;
  control: Control<IFormValues>;
  errors: FieldErrors<IErrors>;
  resultErrors: IResultErrors | undefined;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  setFileName: string | undefined;
  register: UseFormRegister<IFormValues>;
  onEditSubmit(): void;
  onFileChange(e: ChangeEvent<HTMLInputElement>): void;
}

export interface IDiariesProps {
  diaries: Array<IDiary>;
  formattedDate(diaryDate: string): string;
  onOpenDiaryDialog(diary: IDiary): void;
}

export interface IDiaryMenuProps {
  anchorEl: HTMLElement | null;
  isOpenDiaryEdit: boolean;
  onMenuOpen(e: MouseEvent<HTMLElement>): void;
  onMenuClose(): void;
  onOpenCofirmationDialog(): void;
  onDiaryEditMode(): void;
  onDiaryShowMode(): void;
}

export interface IDiarySearchDrawerProps {
  control: Control<IFormValues>;
  selectedDate: null | Date;
  isOpenDrawer: boolean;
  onOpenButton(open: boolean): ReactEventHandler;
  onClearButton(): void;
  onDateChange(date: Date | null): void;
  onSubmit(): void;
}

export interface IFormAreaProps {
  control: Control<IFormValues>;
  errors: FieldErrors<IErrors>;
  resultErrors: IResultErrors | undefined;
  onSubmitText: string;
  isDisabled: boolean;
  contentCount: number;
  defaultDate: string;
  defaultTag: string;
  defaultContent: string;
  defaultMovieSource: string;
  setFileName: string | undefined;
  register: UseFormRegister<IFormValues>;
  onSubmit(): void;
  onFileChange(e: ChangeEvent<HTMLInputElement>): void;
}
