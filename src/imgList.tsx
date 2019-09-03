import React, { useMemo, useCallback, useState, useRef } from 'react';
import { IImageListPorps } from './interface';
import { $Sp5 } from '@beisen-phoenix/style-token';
import { Up, Down } from '@beisen-phoenix/icon';
import {
  SCImageListBox,
  SCImageListItem,
  SCImageListItemWrap,
  SCImageListBoxScroll,
  SCMoveUp,
  SCMoveDown
} from './styled.st';

import { imageListItemSize } from './const';

const moveStep = imageListItemSize + parseInt($Sp5);

const ImgList: React.FunctionComponent<IImageListPorps> = ({
  files,
  current, //当前选中图片的索引
  onClick,
  viewportSize
}) => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  //存储当前的选中的图片，干啥呢，就是当渲染是基于图片变化时，要更新list的位置
  const currentImgRef = useRef(current);
  let imgChanged = currentImgRef.current !== current;
  //如果图片变化了，那就修改ref为当前的图片，名字没取好，看起来有点怪
  if (imgChanged) {
    currentImgRef.current = current;
  }
  let { length: flen } = files;
  // 计算并整个列表的高度
  const listHeigt = useMemo<number>(() => {
    let nsp5 = parseInt($Sp5);
    return imageListItemSize * flen + nsp5 * (flen - 1);
  }, [flen]);

  const wrapperHeight = useMemo<number>(() => {
    return viewportSize.height - 100 * 2;
  }, [viewportSize]);
  //点击每个小预览图的事件，更新当前图片的索引
  const handleClick = useCallback(
    (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      if(idx !== current) onClick(idx);
    },
    [current]
  );

  const scrollStyle = useMemo(() => {
    let isOverflow = wrapperHeight < listHeigt; //是否溢出
    //如果溢出初始点设置在0，没有则设置在中间
    let top;
    //在浏览器尺寸变化时，如果由溢出变成不溢出，测重置scrollTop的值
    if (!isOverflow) {
      setScrollTop(0);
      top = (wrapperHeight - listHeigt) / 2;
    } else {
      // 计算最大的偏移量
      let maxTop = listHeigt - wrapperHeight;
      let originPosi = 0;
      //如果图片发生了变化测重新计算scroll
      if (imgChanged) {
        let fixedScroll = current * moveStep - wrapperHeight /2 + imageListItemSize / 2 ;
        if(fixedScroll > maxTop) fixedScroll = maxTop;
        if(fixedScroll < 0) fixedScroll = 0;
        top = originPosi - fixedScroll;
        setScrollTop(fixedScroll);
      } else {
        //如果超过最大偏移量，使用最大偏移量
        if (scrollTop > maxTop) {
          top = originPosi - maxTop;
        } else {
          top = originPosi - scrollTop;
        }
      }
    }

    return { top };
  }, [scrollTop, wrapperHeight, listHeigt, current]);

  const handleMoveUp = useCallback(() => {
    let newTop = scrollTop - moveStep;
    if (newTop <= 0) newTop = 0;
    setScrollTop(newTop);
  }, [scrollTop]);

  const handleMoveDown = useCallback(() => {
    let newTop = scrollTop + moveStep;
    let maxTop = listHeigt - wrapperHeight;
    if (newTop >= maxTop) newTop = maxTop;
    setScrollTop(newTop);
  }, [scrollTop, listHeigt, wrapperHeight]);

  //生成整个列表
  let imgListEls = useMemo(() => {
    return files.map(({ previewUrl, id }, idx) => {
      return (
        <SCImageListItemWrap
          onClick={handleClick(idx)}
          selected={idx === current}
          key={id}
        >
          <SCImageListItem src={previewUrl} />
        </SCImageListItemWrap>
      );
    });
  }, [files, current]);
  return (
    <>
      {scrollTop > 0 && (
        <SCMoveUp onClick={handleMoveUp}>
          <Up />
        </SCMoveUp>
      )}
      {scrollTop < listHeigt - wrapperHeight && (
        <SCMoveDown onClick={handleMoveDown}>
          <Down />
        </SCMoveDown>
      )}
      <SCImageListBoxScroll style={{ height: wrapperHeight }}>
        <SCImageListBox style={scrollStyle} ht={listHeigt}>
          {imgListEls}
        </SCImageListBox>
      </SCImageListBoxScroll>
    </>
  );
};

export { ImgList as default };
