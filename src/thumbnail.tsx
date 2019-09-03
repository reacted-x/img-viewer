import React, { useMemo } from 'react';
import { IThumbnailProps } from './interface';
import useThumbnailDrag from './useThumbnailDrag';
import { getThumbnailSize, getThumbnailViewportSize } from './const';

import {
  SCThumbnailBox,
  SCThumbnailImg,
  SCThumbnailViewTip
} from './styled.st';

const Thumbnail: React.FunctionComponent<IThumbnailProps> = ({
  bgUrl,
  rotate,
  offset,
  realSize,
  originSize,
  viewportSize,
  updateOffset,
  imgMaxOffset
}) => {
  /**
   * 其实下面的东西都可以放在样式里，但是为了兼容IE，不得不用更稳定的方式来实现
   * 为什么我在外面计算样式，
   * 因为sc当中任何的样式变化都会生成不同的className,
   * 通过观察，高频触发的事件，在生成过程当中会触发大量sc计算，第一像素的变化都会对应生成一个新的className,
   * 从而会导致一些性能上的问题，
   * */

  // 获取缩略图外框的样式，主要就是宽和高
  const boxSize = useMemo(() => {
    let { height: rHeight, width: rWidth } = realSize;
    let [height, width] = getThumbnailSize(rHeight, rWidth);
    return { height, width };
  }, [realSize]);


  const imgSize = useMemo(() => {
    // 获取图片的原始大小
    let { height: oHeight, width: oWidth } = originSize;
    // 获取小预览图的尺寸
    let [height, width] = getThumbnailSize(oHeight, oWidth);
    return {height, width};
  }, [originSize])

  // 提示位置的小框框的大小
  const tipSize = useMemo(() => {
    let [height, width] = getThumbnailViewportSize(realSize, viewportSize);
    return {height, width}
  }, [realSize, viewportSize])

  const {
    handleDrag,
    handleDragStart,
    handleDragLeave,
  } = useThumbnailDrag(tipSize, boxSize, realSize, offset, updateOffset, imgMaxOffset);

  // 通过计算得到缩略图图片的样式，宽高和定位
  const thumbnailImgStyle = useMemo(() => {
    let { height, width } = imgSize;
    // 获取预览图外框的尺寸，如果不旋转值是一样的，为了省事又算了一回
    let { height: boxHeight, width: boxWidth } = boxSize;
    // 让图片在框里居中显示，得到定位的值，因为旋转的问题才需要这样做，否则就是0，0就完了，反正一样大，我也没办法，用样式IE有bug
    let left = (boxWidth - width) / 2;
    let top = (boxHeight - height) / 2;
    return { height, width, left, top };
  }, [imgSize, boxSize]);

  // tip是啥，就是缩略图中那个代表视窗的小方块的样式，
  const tipStyle = useMemo(() => {
    let { height: nHeight, width: nWidth } = realSize;
    let { height: boxHeight, width: boxWidth } = boxSize;
    let {height, width} = tipSize;
    let originRight = (boxWidth - width) / 2;
    let originBottom = (boxHeight - height) / 2;
    let { x, y } = offset;
    let right = 0,
      bottom = 0;
    if (boxWidth < nWidth) {
      right = (boxWidth / nWidth) * x + originRight;
    }
    if (boxHeight < nHeight) {
      bottom = (boxHeight / nHeight) * y + originBottom ;
    }

    return { right, bottom, height, width };
  }, [realSize, boxSize, offset, tipSize]);

  return (
    <SCThumbnailBox style={boxSize}>
      <SCThumbnailImg style={thumbnailImgStyle} rotate={rotate} src={bgUrl} />
      <SCThumbnailViewTip
        style={tipStyle}
        onMouseMove={handleDrag}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragLeave}
        onMouseLeave={handleDragLeave}
      />
    </SCThumbnailBox>
  );
};

export { Thumbnail as default };
