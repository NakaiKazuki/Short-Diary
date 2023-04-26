interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string | undefined;
  movie_source: string | undefined;
  user_id: number;
}

interface IPagy {
  page: number;
  pages: number;
}

interface IItemProps {
  original: string;
}
export interface IConfirmDialogProps {
  isOpen: boolean;
  title: string;
  contentText: string;
  obj: IDiary;
  onDelete(obj: IDiary): void;
  onClose(): void;
}

export interface IPaginationAreaProps {
  pagy: IPagy;
  onPageChange(page: number): void;
}

export interface IAnimatedSection {
  children: JSX.Element;
}
export interface ICustomGalleryProps {
  items: Array<IItemProps> | [];
}
