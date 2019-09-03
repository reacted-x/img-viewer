import styled from 'styled-components';
import {
  $M10,
  $alpha,
  $Fs2,
  $M9,
  $Sp7,
  $family,
  $Sp3,
  $Sp2,
  $Sp5,
  $S3,
  $Sh5,
  $M4,
  $Sp9,
  $M5,
  $Sp11,
  $Ra2
} from '@beisen-phoenix/style-token';
import { ERoomStatus } from './interface';

const vertiBtnSize = 24;

import {
  titleBarHeight,
  previewLeftMarg,
  previewRightMarg,
  btnAreaWidth,
  imageListItemSize,
  imageListItemBorderSize
} from './const';

export const SCMask = styled.div.attrs({ unselectable: 'on' })<{
  showMask: boolean;
  zIndex: number;
  loaded: boolean;
}>`
  user-select: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => props.zIndex};
  opacity: ${props => (props.loaded ? 1 : 0)};
  transition: opacity 1s;
  background-color: ${props =>
    props.showMask ? $alpha($M10, '0.5') : 'transparent'};
`;

export const SCTitleBar = styled.div`
  position: absolute;
  height: ${titleBarHeight}px;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${$M10};
  font-family: ${$family};
`;

export const SCPreviewBox = styled.div`
  margin-left: ${previewLeftMarg}px;
  margin-top: ${titleBarHeight}px;
  margin-right: ${previewRightMarg}px;
  overflow: hidden;
  position: relative;
`;

export const SCPreImg = styled.img<{ room: ERoomStatus; rotate: number }>`
  position: absolute;
  transform: rotate(${props => props.rotate}deg);
  transition: transform 0.2s;
  cursor: ${props => (props.room === ERoomStatus.origin ? 'grab' : 'default')};
  ${$Sh5};
`;

export const SCFileName = styled.div`
  vertical-align: top;
  display: inline-block;
  height: ${titleBarHeight}px;
  width: calc(100% - ${btnAreaWidth}px);
  line-height: 50px;
  color: ${$M9};
  box-sizing: border-box;
  padding-left: ${$Sp7};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SCActionBox = styled.div`
  width: ${btnAreaWidth}px;
  height: ${titleBarHeight}px;
  display: inline-block;
  vertical-align: top;
  ${$Fs2};
  line-height: 50px;
  text-align: right;
`;

export const SCActionItem = styled.div<{ disabled?: boolean }>`
  display: inline-block;
  cursor: pointer;
  color: ${({ disabled = false }) => (disabled ? $M4 : $M9)};
  & + & {margin-left: ${$Sp7};}
  & + &:last-child {
    margin-left: ${$Sp9};
    margin-right: ${$Sp7};
    svg {
      margin-right:0;
    }
  }
  svg {
    margin-right: ${$Sp3};
    height: 18px;
    width: 18px;
    vertical-align: text-top;
    path + path {
      fill: ${({ disabled = false }) => (disabled ? $M4 : $M9)};
    }
  }
  :hover {
    color: ${({ disabled = false }) => (disabled ? $M4 : $M5)};
    svg {
    path + path {
      fill: ${({ disabled = false }) => (disabled ? $M4 : $M5)};
    }
  }
`;

export const SCThumbnailBox = styled.div`
  position: absolute;
  right: ${$Sp2};
  bottom: ${$Sp2};
  border: 2px solid ${$M9};
`;

export const SCThumbnailImg = styled.img<{ rotate: number }>`
  position: absolute;
  left: 0;
  right: 0;
  transform: rotate(${props => props.rotate}deg);
  transition: transform 0.2s;
`;

// 右下预览图的那个小方框框
export const SCThumbnailViewTip = styled.div`
  position: absolute;
  box-sizing: border-box;
  border: solid 2px ${$S3};
  cursor:pointer;
`;

export const SCImageListBoxScroll = styled.div`
  position: absolute;
  right: ${$Sp7};
  width: ${imageListItemSize}px;
  bottom: 100px;
  overflow: hidden;
`;

export const SCImageListBox = styled.div<{ ht: number }>`
  position: absolute;
  width: ${imageListItemSize}px;
  height: ${props => props.ht}px;
  left: 0;
  transition: top 0.2s;
`;

export const SCImageListItemWrap = styled.div<{ selected: boolean }>`
  height: ${imageListItemSize}px;
  width: ${imageListItemSize}px;
  border-radius: ${$Ra2};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  cursor: pointer;
  border: 2px solid ${props => (props.selected ? $S3 : 'transparent')};
  & + & {
    margin-top: ${$Sp5};
  }
`;

export const SCImageListItem = styled.img`
  max-height: ${imageListItemSize - imageListItemBorderSize}px;
  max-width: ${imageListItemSize - imageListItemBorderSize}px;
`;

const SCMoveButton = styled.div`
  height: 40px;
  width: 40px;
  position: absolute;
  top: 50%;
  cursor: pointer;
  margin-top: -${40 / 2 - titleBarHeight / 2}px;
  svg {
    height: 40px;
    width: 40px;
    path + path {
      fill: ${$M9};
    }
  }
  :hover {
    path + path {
      fill: ${$M5};
    }
  }
`;

export const SCMoveLeft = styled(SCMoveButton)`
  left: ${$Sp11};
`;
export const SCMoveRight = styled(SCMoveButton)`
  right: ${parseInt($Sp9) + 60 + parseInt($Sp7)}px;
`;

const SCVertButton = styled.div`
  height: 24px;
  width: 24px;
  position: absolute;
  right: ${(imageListItemSize - vertiBtnSize) / 2 + parseInt($Sp7)}px;
  cursor: pointer;
  svg {
    height: 24px;
    width: 24px;
    path + path {
      fill: ${$M9};
    }
  }
  :hover {
    path + path {
      fill: ${$M5};
    }
  }
`;

export const SCMoveUp = styled(SCVertButton)`
  top: ${titleBarHeight + 100 - vertiBtnSize - parseInt($Sp5)}px;
`;

export const SCMoveDown = styled(SCVertButton)`
  bottom: ${100 - vertiBtnSize - parseInt($Sp5)}px;
`;
