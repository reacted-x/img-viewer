import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef
} from 'react';
import { createPortal } from 'react-dom';
import { IPreviewProps, ERoomStatus, ISize, IPosi } from './interface';
import useMountNode from './useMountNode';
import { SCMask, SCMoveLeft, SCMoveRight } from './styled.st';
import ImgBox from './imgBox';
import TitleBar from './titleBar';
import ImgList from './imgList';
import {
  getViewPortSize,
  defaultButtonName,
  initPosi,
  fixOffset
} from './const';
import { Left, Right } from '@beisen-phoenix/icon';

const ImgPreview: React.FunctionComponent<IPreviewProps> = ({
  files = [],
  onClose,
  onDownload,
  defaultSelected = 0,
  download = true,
  showMask = true,
  buttonName = defaultButtonName,
  showButtonName = true,
  zIndex = 10
}) => {
  const [naturalSize, setNaturalSize] = useState<ISize>({
    height: 0,
    width: 0
  });
  const [rotate, setRotate] = useState<number>(0);
  const [viewportSize, setViewportSize] = useState<ISize>(getViewPortSize());
  const [dragPosiDelta, setDragPosiDelta] = useState<IPosi>(initPosi); //记录鼠标拖拽时的偏移量
  const [currentImg, setCurrentImg] = useState<number>(defaultSelected);
  const [room, setRoom] = useState<ERoomStatus>(ERoomStatus.fit);
  const [loaded, setLoaded] = useState(false);

  const isOddRotate = (rotate / 90) % 2 !== 0;

  // 在旋转的情况下获取图片真实的宽高, 如果图片旋转了奇数次，宽高需要交换
  const realSize = useMemo<ISize>(() => {
    if (isOddRotate) {
      let { height: width, width: height } = naturalSize;
      return { height, width };
    }
    return naturalSize;
  }, [isOddRotate, naturalSize]);

  //计算最大的偏移量
  const maxOffet = useMemo<IPosi>(() => {
    let { height: vpHeight, width: vpWidth } = viewportSize;
    let { height, width } = realSize;
    return {
      x: Math.floor((width - vpWidth) / 2),
      y: Math.floor((height - vpHeight) / 2)
    };
  }, [realSize, viewportSize]);

  const resizeHandleRef = useRef(() => {
    setViewportSize(getViewPortSize());
  });

  let flen = files.length;

  useEffect(() => {
    if (
      Math.abs(dragPosiDelta.x) > Math.abs(maxOffet.x) ||
      Math.abs(dragPosiDelta.y) > Math.abs(maxOffet.y)
    ) {
      let x = fixOffset(dragPosiDelta.x, maxOffet.x);
      let y = fixOffset(dragPosiDelta.y, maxOffet.y);
      setDragPosiDelta({ x, y });
    }
  }, [dragPosiDelta, maxOffet, setDragPosiDelta]);

  //当window尺寸发生变化时，对应的视窗尺寸也会发生变化，此时需要更新视窗尺寸
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 50);
    window.addEventListener('resize', resizeHandleRef.current);
    return () => {
      window.removeEventListener('resize', resizeHandleRef.current);
    };
  }, []);

  //根据图片真实的宽高，确定是否要显示[查看原图按钮]
  const shouldShowOrigin = useMemo<boolean>(() => {
    let { height: rHeight, width: rWidth } = realSize;
    let { height: vpHeight, width: vpWidth } = viewportSize;
    return rHeight > vpHeight || rWidth > vpWidth;
  }, [realSize, viewportSize]);
  // 图片加载完成之后的处理函数，主要用来获取图片的真实尺寸
  const handleImgLoad = useCallback((size: ISize) => {
    setNaturalSize(size);
  }, []);

  // 点击切换图片的处理函数
  const handleChangeCurrent = useCallback((idx: number) => {
    setCurrentImg(idx);
    setRoom(ERoomStatus.fit);
    setRotate(0);
    setNaturalSize({ height: 0, width: 0 });
  }, []);

  const handleMoveLeft = useCallback(() => {
    setCurrentImg(currentImg - 1);
    setNaturalSize({ height: 0, width: 0 });
  }, [currentImg]);

  const handleMoveRight = useCallback(() => {
    setCurrentImg(currentImg + 1);
    setNaturalSize({ height: 0, width: 0 });
  }, [currentImg]);

  // 点击下载的处理函数
  const handleDownload = useCallback(() => {
    let curFile = files[currentImg];
    if (typeof onDownload === 'function') onDownload(curFile);
  }, [currentImg, onDownload]);

  // 点击旋转的处理函数
  const handleRotate = useCallback(() => {
    setRotate(rotate + 90);
  }, [rotate]);

  // 点击放大缩小的处理函数
  const handleRoom = useCallback(() => {
    if (!shouldShowOrigin) return;
    let { fit, origin } = ERoomStatus;
    setRoom(room === origin ? fit : origin);
  }, [room, shouldShowOrigin]);

  let node = useMountNode('');
  let el = (
    <SCMask showMask={showMask} zIndex={zIndex} loaded={loaded}>
      <TitleBar
        {...files[currentImg]}
        onDownload={handleDownload}
        onRoom={handleRoom}
        onRotate={handleRotate}
        onClose={onClose}
        room={room}
        allowOrigin={shouldShowOrigin}
        download={download}
        buttonName={buttonName}
        showButtonName={showButtonName}
      />
      <ImgBox
        rotate={rotate}
        {...files[currentImg]}
        onLoad={handleImgLoad}
        size={naturalSize}
        room={room}
        realSize={realSize}
        viewportSize={viewportSize}
        isOddRotate={isOddRotate}
        dragDelta={dragPosiDelta}
        onDragDeltaChange={setDragPosiDelta}
        maxOffset={maxOffet}
      />
      <ImgList
        files={files}
        current={currentImg}
        onClick={handleChangeCurrent}
        viewportSize={viewportSize}
      />
      {currentImg > 0 && (
        <SCMoveLeft onClick={handleMoveLeft}>
          <Left />
        </SCMoveLeft>
      )}
      {currentImg < flen - 1 && (
        <SCMoveRight onClick={handleMoveRight}>
          <Right />
        </SCMoveRight>
      )}
    </SCMask>
  );
  return createPortal(el, node);
};

export * from './interface';
export { ImgPreview as default };
