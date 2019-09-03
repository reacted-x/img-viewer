import {ISize} from './interface';

export const titleBarHeight = 50;
export const previewLeftMarg = 100;
export const previewRightMarg = 170;
export const btnAreaWidth = 310;
export const thumbnailMaxSize = 120;
export const imageListItemSize = 60;
export const imageListItemBorderSize = 2;

export const initPosi = { x: 0, y: 0 };

export const getGhostImg = (): HTMLImageElement => {
  let img = new Image(0, 0);
  img.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  return img;
};

export const fixOffset = (num: number, maxNum: number): number => {
  if (maxNum <= 0) return 0;
  let absNum = Math.abs(num);
  if (absNum > maxNum) {
    return (num / absNum) * maxNum;
  }
  return num;
};

export const getThumbnailViewportSize = (realSize:ISize, viewportSize:ISize) => {
  let {height: vHeight, width: vWidth} = viewportSize;
  let {height: nHeight, width: nWidth} = realSize;
  if(vHeight > nHeight) vHeight = nHeight;
  if(vWidth > nWidth ) vWidth = nWidth;
  let [prevHeight, prevWidth] = getThumbnailSize(nHeight, nWidth); // 预览图的高和宽
  let boxHeight = Math.floor((vHeight / nHeight) * prevHeight); //计算预览中指示视窗的高
  let boxWidth = Math.floor((vWidth / nWidth) * prevWidth); // 计算预览中指示视窗的高
  return [boxHeight, boxWidth];
};

export const getThumbnailSize = (nHeight, nWidth) => {
  let delta = nWidth - nHeight;
  let height = thumbnailMaxSize;
  let width = Math.ceil((thumbnailMaxSize * nWidth) / nHeight);

  if (delta >= 0) {
    width = thumbnailMaxSize;
    height = Math.ceil((thumbnailMaxSize * nHeight) / nWidth);
  }
  return [height, width];
};

export const getViewPortSize = ():ISize => {
  return {
    width: window.innerWidth - previewLeftMarg - previewRightMarg,
    height: window.innerHeight - titleBarHeight
  }
}

export const getRealSize = (oddRotate: boolean, size: ISize):ISize => {
  if(oddRotate) {
    let {height: width, width: height} = size;
    return {height, width}
  }
  return size;
}

export const defaultButtonName = {
  rotate: "旋转",
  showOriginSize: "查看原图",
  showFitSize: "适应屏幕",
  download: "下载"
}