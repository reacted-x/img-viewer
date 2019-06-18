import React, { useCallback, SyntheticEvent, useMemo } from 'react';
import { ITitleBarProps, ERoomStatus } from './interface';
import { SCTitleBar, SCActionBox, SCFileName, SCActionItem } from './styled.st';
import Tooltip from '@beisen-phoenix/tooltip';
import {
  DownloadS,
  Close,
  Enlarge,
  Narrow,
  Rotate
} from '@beisen-phoenix/icon';

const TitleBar: React.FunctionComponent<ITitleBarProps> = props => {
  const handleDownload = useCallback(
    (e: SyntheticEvent<HTMLDivElement>) => {
      props.onDownload();
    },
    [props.onDownload]
  );

  let {
    buttonName,
    name: fileName,
    onRotate,
    onRoom,
    allowOrigin,
    room,
    onClose,
    download,
    showButtonName
  } = props;

  const rotateEl = useMemo(() => {
    let el = (
      <SCActionItem onClick={onRotate}>
        <Rotate />
        {showButtonName && buttonName.rotate}
      </SCActionItem>
    );
    if (!showButtonName) el = <Tooltip title={buttonName.rotate}>{el}</Tooltip>;
    return el;
  }, [buttonName.rotate, showButtonName, onRotate]);

  const roomEl = useMemo(() => {
    let roomName =
      room === ERoomStatus.fit
        ? buttonName.showOriginSize
        : buttonName.showFitSize;
    let el = (
      <SCActionItem onClick={onRoom} disabled={!allowOrigin}>
        {room === ERoomStatus.fit ? <Enlarge /> : <Narrow />}
        {showButtonName && roomName}
      </SCActionItem>
    );
    if (!showButtonName) el = <Tooltip title={roomName}>{el}</Tooltip>;
    return el;
  }, [
    onRoom,
    allowOrigin,
    room,
    buttonName.showOriginSize,
    buttonName.showFitSize,
    showButtonName
  ]);

  const downloadEl = useMemo(() => {
    if (download) {
      let el = (
        <SCActionItem onClick={handleDownload}>
          <DownloadS />
          {showButtonName && buttonName.download}
        </SCActionItem>
      );
      if (!showButtonName)
        el = <Tooltip title={buttonName.download}>{el}</Tooltip>;
      return el;
    }
  }, [download, handleDownload, buttonName.download, showButtonName]);

  return (
    <SCTitleBar>
      <SCFileName>{fileName}</SCFileName>
      <SCActionBox>
        {rotateEl}
        {roomEl}
        {downloadEl}
        <SCActionItem onClick={onClose}>
          <Close />
        </SCActionItem>
      </SCActionBox>
    </SCTitleBar>
  );
};

export { TitleBar as default };
