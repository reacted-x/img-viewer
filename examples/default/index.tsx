import React, { useState } from 'react';
import ImgPreview, { IFileItem } from '../../src';

const lessFiles: IFileItem[] = [
  {
    name: '漂亮小姐姐.png', 
    id: '123',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/4539b8ba767f4d77be26f822801b4dc9.jpg'
  },
  {
    name: '比较小的图片.png',
    id: '12sss3',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/d79aa9a59c4c4b9694b17459ad024d37.png'
  },
  {
    name: '非常漂亮的小姐姐',
    id: '1234',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/f18f7dd660ef482e9cb31aeb02b9e674.jpg'
  }
];

const files: IFileItem[] = [
  
  {
    name: '漂亮小姐姐.png', 
    id: '123',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/4539b8ba767f4d77be26f822801b4dc9.jpg'
  },
  {
    name: '比较小的图片.png',
    id: '12sss3',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/d79aa9a59c4c4b9694b17459ad024d37.png'
  },
  {
    name: '非常漂亮的小姐姐',
    id: '1234',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/f18f7dd660ef482e9cb31aeb02b9e674.jpg'
  },
  {
    name: '漂亮小姐姐',
    id: '123a',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/4539b8ba767f4d77be26f822801b4dc9.jpg'
  },
  {
    name: '非常漂亮的小姐姐',
    id: '1234b',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/f18f7dd660ef482e9cb31aeb02b9e674.jpg'
  },
  {
    name: '漂亮小姐姐',
    id: '123c',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/4539b8ba767f4d77be26f822801b4dc9.jpg'
  },
  {
    name: '非常漂亮的小姐姐',
    id: '1234d',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/f18f7dd660ef482e9cb31aeb02b9e674.jpg'
  },
  {
    name: '漂亮小姐姐',
    id: '123e',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/4539b8ba767f4d77be26f822801b4dc9.jpg'
  },
  {
    name: '非常漂亮的小姐姐',
    id: '1234f',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/f18f7dd660ef482e9cb31aeb02b9e674.jpg'
  },
  {
    name: '漂亮小姐姐',
    id: '123g',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/4539b8ba767f4d77be26f822801b4dc9.jpg'
  },
  {
    name: '非常漂亮的小姐姐',
    id: '1234h',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/f18f7dd660ef482e9cb31aeb02b9e674.jpg'
  },
  {
    name: '漂亮小姐姐',
    id: '123i',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/4539b8ba767f4d77be26f822801b4dc9.jpg'
  },
  {
    name: '非常漂亮的小姐姐',
    id: '1234j',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/f18f7dd660ef482e9cb31aeb02b9e674.jpg'
  },
  {
    name: '帅哥帅哥',
    id: 'handsometwo',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/dcb836403aa7409da9d6f315eedd4220.png'
  }
];

export default function Preivew() {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showFourth, setShowFourth] = useState(false);
  const handleClick = func => {
    func(true);
  };

  const handleClose = func => {
    func(false);
  };

  const handleDownload = (id: any) => {
    console.log(id);
  };

  return (
    <div>
      <button onClick={() => handleClick(setShowFirst)}>带下载:默认选中第二张</button>
      {showFirst && (
        <ImgPreview
          files={files}
          onClose={() => handleClose(setShowFirst)}
          onDownload={handleDownload}
          defaultSelected={1}
        />
      )}
      <br />
      <br />
      <button onClick={() => handleClick(setShowSecond)}>
        不带下载,不显示遮罩
      </button>
      {showSecond && (
        <ImgPreview
          files={files}
          onClose={() => handleClose(setShowSecond)}
          onDownload={handleDownload}
          download={false}
          showMask={false}
        />
      )}
      <br />
      <br />
      <button onClick={() => handleClick(setShowThird)}>
        文件个数少
      </button>
      {showThird && (
        <ImgPreview
          zIndex={1000}
          files={lessFiles}
          onClose={() => handleClose(setShowThird)}
          onDownload={handleDownload}
          showButtonName={false}
        />
      )}
      <br />
      <br />
      <button onClick={() => handleClick(setShowFourth)}>
        替换按钮的文本(多语言支持)
      </button>
      {showFourth && (
        <ImgPreview
          files={files}
          onClose={() => handleClose(setShowFourth)}
          onDownload={handleDownload}
          showButtonName={false}
          buttonName={{
            rotate: 'rotate clockwidth',
            showFitSize: 'fit screen',
            showOriginSize: 'origin image',
            download: 'download'
          }}
        />
      )}
    </div>
  );
}
