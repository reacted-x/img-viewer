export interface IFileItem {
  name: string;
  previewUrl: string;
  id: string;
}

export interface IButtonName {
  rotate: string;
  showOriginSize: string;
  showFitSize: string;
  download: string;
}

export interface IPreviewProps {
  files: IFileItem[];
  onClose: () => void;
  onDownload?: (data: IFileItem) => void;
  defaultSelected?: number;
  download?: boolean;
  showMask?: boolean;
  showButtonName?: boolean;
  buttonName?: IButtonName;
  zIndex?: number
}

export interface IImageListPorps {
  files: IFileItem[];
  current: number;
  onClick: (idx: number) => void;
  viewportSize: ISize;
}

export interface ISize {
  height: number;
  width: number;
}

export enum ERoomStatus {
  origin = 'origin',
  fit = 'fit'
}

export interface IImgboxProps extends IFileItem {
  onLoad: (size: ISize) => void;
  room: ERoomStatus;
  size: ISize;
  rotate: number;
  realSize: ISize;
  viewportSize: ISize;
  isOddRotate: boolean;
}

export interface ITitleBarProps extends IFileItem {
  onRotate: () => void;
  onDownload: () => void;
  onRoom: () => void;
  onClose: () => void;
  room: ERoomStatus;
  allowOrigin: boolean;
  download: boolean;
  buttonName: IButtonName;
  showButtonName: boolean;
}

export interface IThumbnailProps {
  bgUrl: string;
  rotate: number;
  offset: IPosi;
  realSize: ISize;
  originSize: ISize;
  viewportSize: ISize;
  updateOffset: (offset: IPosi) => void;
  imgMaxOffset: IPosi;
}

export interface IPosi {
  x: number;
  y: number;
}
