import { useMemo } from 'react';

import { ISize, ERoomStatus } from './interface';

export default function useImageStyle({
  room,
  realSize,
  rotate,
  viewportSize,
  dragPosiDelta,
  isOddRotate,
  natureSize
}: {
  viewportSize: ISize;
  realSize: ISize;
  room: ERoomStatus;
  rotate: number;
  dragPosiDelta: { x: number; y: number };
  isOddRotate: boolean;
  natureSize: ISize;
}): React.CSSProperties {
  /** 通过鼠标的位移得到图片的偏移量
   * 为什么我在外面计算样式，
   * 因为sc当中任何的样式变化都会生成不同的className,
   * 通过观察，高频触发的事件，在生成过程当中会触发大量sc计算，第一像素的变化都会对应生成一个新的className,
   * 从而会导致一些性能上的问题， */

  /**
   * 别问我怎么算的，我也不知道，试呀试呀，就对了
   */
  let imgSize = useMemo(() => {
    let { height: visualHeight, width: visualWidth } = realSize;
    let { height: vpHeight, width: vpWidth } = viewportSize;
    let { height: natureHeight, width: natureWidth } = natureSize;
    if (visualHeight <= vpHeight && visualWidth <= vpWidth) return natureSize; // 如果图片没有溢出不用计算，应该显示多大就多大
    if (room === ERoomStatus.origin) return natureSize;

    let portionHeight = visualHeight / vpHeight;
    let portionWidth = visualWidth / vpWidth;
    if (portionHeight > portionWidth) {
      if (isOddRotate) {
        return {
          width: vpHeight,
          height: (natureHeight * vpHeight) / natureWidth
        };
      }
      return {
        height: vpHeight,
        width: natureWidth / portionHeight
      };
    } else {
      if (isOddRotate) {
        return {
          height: vpWidth,
          width: (natureWidth * vpWidth) / natureHeight
        };
      }
      return {
        width: vpWidth,
        height: natureHeight / portionWidth
      };
    }
  }, [rotate, realSize, room, viewportSize, isOddRotate]);

  // 计算图片位置原点
  let imgOriginPosi = useMemo(() => {
    let { height: imgHeight, width: imgWidth } = imgSize;
    let { height: vpHeight, width: vpWidth } = viewportSize;
    return {
      left: (vpWidth - imgWidth) / 2,
      top: (vpHeight - imgHeight) / 2
    };
  }, [imgSize, viewportSize]);

  // 图片位置原点与偏移量相加得到真实的图片位置
  let imgOffset = useMemo(() => {
    let offset = {
      left: dragPosiDelta.x + imgOriginPosi.left,
      top: dragPosiDelta.y + imgOriginPosi.top
    };
    return offset;
  }, [dragPosiDelta, imgOriginPosi]);
  return Object.assign({}, imgOffset, imgSize);
}
