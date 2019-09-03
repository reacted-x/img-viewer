import { useRef, useCallback, useMemo } from 'react';
import { IPosi, ISize } from './interface';
import { fixOffset, initPosi } from './const';

export default function useThumbnailDrag(
  tipSize: ISize,
  boxSize: ISize,
  realsize: ISize,
  imgOffset: IPosi,
  updateImgOffset: (ofs: IPosi) => void,
  imgMaxOffset: IPosi
) {
  const dragMemPosition = useRef<IPosi>(initPosi); //缓存鼠标位置的ref
  const isDragging = useRef<boolean>(false);

  const portion = realsize.height / boxSize.height;

  const offset = { x: imgOffset.x / portion, y: imgOffset.y / portion };

  //计算最大的偏移量
  const maxOffet = useMemo<IPosi>(() => {
    let { height: boxHeight, width: boxWidth } = boxSize;
    let { height, width } = tipSize;
    return {
      x: Math.floor((boxWidth - width) / 2),
      y: Math.floor((boxHeight - height) / 2)
    };
  }, [tipSize, boxSize]);

  //当拖拽开始的时候记住鼠标的当前位置，并设置拖拽时的预览图
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLImageElement>) => {
      isDragging.current = true;
      dragMemPosition.current = { x: e.clientX, y: e.clientY };
    },
    []
  );

  const handleDrag = useCallback(
    (e: React.DragEvent<HTMLImageElement>) => {
      e.preventDefault(); //禁止所有默认事件，省得图片跟着鼠标跑
      if (!isDragging.current) return;
      let { x: memX, y: memY } = dragMemPosition.current;
      let { x: dlX, y: dlY } = offset;
      let { x: maxX, y: maxY } = maxOffet;
      let { clientX: eX, clientY: eY } = e; //鼠标拖拽结束的点
      dragMemPosition.current = { x: eX, y: eY }; //记住这些鼠标所在的位置
      let x = fixOffset(
        dlX - eX + memX /* 鼠标当前位置 - 鼠标上一次的位置 + 原来的偏移量 */,
        maxX /**最大偏移量 */
      );
      let y = fixOffset(
        dlY - eY + memY /* 鼠标当前位置 - 鼠标上一次的位置 + 原来的偏移量 */,
        maxY /**最大偏移量 */
      );

      let newX = fixOffset(x * portion, imgMaxOffset.x);
      let newY = fixOffset(y * portion, imgMaxOffset.y);
      updateImgOffset({
        x: newX,
        y: newY
      });
    },
    [offset, maxOffet, portion, imgOffset, imgMaxOffset]
  );

  //当拖拽过程中，鼠标离开图片之后，锁定当前位置，不进行位置更新
  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLImageElement>) => {
      isDragging.current = false;
    },
    []
  );

  return { handleDragStart, handleDrag, handleDragLeave };
}
