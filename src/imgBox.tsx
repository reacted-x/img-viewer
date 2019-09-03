import React, {
  useCallback,
  SyntheticEvent,
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
} from 'react';
import { IImgboxProps, ERoomStatus, IPosi } from './interface';
import { SCPreviewBox, SCPreImg,SCLoadingText } from './styled.st';
import Thumbnail from './thumbnail';
import useImageStyle from './useImageStyle';
import { initPosi, fixOffset } from './const';

const ImgBox: React.FunctionComponent<IImgboxProps> = ({
  previewUrl,
  size,
  onLoad,
  room,
  rotate,
  realSize,
  viewportSize,
  isOddRotate
}) => {
  const dragMemPosition = useRef<IPosi>(initPosi); //缓存鼠标位置的ref
  const isDragging = useRef<boolean>(false);
  const [dragPosiDelta, setDragPosiDelta] = useState<IPosi>(initPosi); //记录鼠标拖拽时的偏移量

  const imgLoaded = useMemo<boolean>(() => {
    return !!size.height || !!size.width;
  }, [size.height, size.width]);

  const imgStyle = useImageStyle({
    room,
    realSize,
    rotate,
    viewportSize,
    dragPosiDelta,
    isOddRotate,
    natureSize: size
  });

  // 图片加载完成后读取原始更新原始大小
  const handleImageLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      let img = e.currentTarget;
      onLoad({
        height: img.naturalHeight,
        width: img.naturalWidth
      });
    },
    [onLoad]
  );

  //当拖拽开始的时候记住鼠标的当前位置，并设置拖拽时的预览图
  const handleImageDragStart = useCallback(
    (e: React.DragEvent<HTMLImageElement>) => {
      isDragging.current = room === ERoomStatus.origin;
      dragMemPosition.current = { x: e.clientX, y: e.clientY };
    },
    [room]
  );

  //计算最大的偏移量
  const maxOffet = useMemo<IPosi>(() => {
    let { height: vpHeight, width: vpWidth } = viewportSize;
    let { height, width } = realSize;
    return {
      x: Math.floor((width - vpWidth) / 2),
      y: Math.floor((height - vpHeight) / 2)
    };
  }, [realSize, viewportSize]);

  //当拖拽进行的时的加调，不停的更新鼠标的位移
  const handleImageDrag = useCallback(
    (e: React.DragEvent<HTMLImageElement>) => {
      e.preventDefault(); //禁止所有默认事件，省得图片跟着鼠标跑
      if (!isDragging.current) return;
      let { x: memX, y: memY } = dragMemPosition.current;
      let { x: dlX, y: dlY } = dragPosiDelta;
      let { x: maxX, y: maxY } = maxOffet;
      let { clientX: eX, clientY: eY } = e; //鼠标拖拽结束的点
      dragMemPosition.current = { x: eX, y: eY }; //记住这些鼠标所在的位置
      let x = fixOffset(
        eX - memX + dlX /* 鼠标当前位置 - 鼠标上一次的位置 + 原来的偏移量 */,
        maxX /**最大偏移量 */
      );
      let y = fixOffset(
        eY - memY + dlY /* 鼠标当前位置 - 鼠标上一次的位置 + 原来的偏移量 */,
        maxY /**最大偏移量 */
      );
      setDragPosiDelta({ x, y });
    },
    [dragPosiDelta.x, dragPosiDelta.y, maxOffet]
  );

  //当拖拽过程中，鼠标离开图片之后，锁定当前位置，不进行位置更新
  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLImageElement>) => {
      isDragging.current = false;
    },
    []
  );

  //当room或者图片发生变化时偏移量归零
  useLayoutEffect(() => {
    setDragPosiDelta(initPosi);
  }, [room, previewUrl, rotate]);

  let vpSt = useMemo(() => {
    return {
      height: `${viewportSize.height}px`,
      width: `${viewportSize.width}px`
    };
  }, [viewportSize]);

  return (
    <SCPreviewBox style={vpSt}>
      {!imgLoaded &&  <SCLoadingText>加载中...</SCLoadingText>}
      <SCPreImg
        src={previewUrl}
        key={previewUrl} /**为什么要加key，是为了切换图片的时候，把动画关了 */
        onLoad={handleImageLoad}
        room={room}
        rotate={rotate}
        onMouseMove={handleImageDrag}
        onMouseDown={handleImageDragStart}
        onMouseUp={handleDragLeave}
        onMouseLeave={handleDragLeave}
        style={imgStyle}
      />
      {room === ERoomStatus.origin && (
        <Thumbnail
          rotate={rotate}
          bgUrl={previewUrl}
          realSize={realSize}
          originSize={size}
          offset={dragPosiDelta}
          viewportSize={viewportSize}
          updateOffset={setDragPosiDelta}
          imgMaxOffset={maxOffet}
        />
      )}
    </SCPreviewBox>
  );
};

export { ImgBox as default };
