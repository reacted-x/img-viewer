# 图片预览

## 参数说明

```ts
interface IPreviewProps {
  // 预览文件列表
  files: IFileItem[];
  // 点击关闭按钮的回调函数
  onClose: () => void;
  // 点击下载按钮的回调
  onDownload?: (data: IFileItem) => void;
  // 设置默认选中的图片
  defaultSelected?: number;
  // 控制是否显示下载按钮
  download?: boolean;
  // 控制是否显示遮罩，主要是放置遮罩叠加
  showMask?: boolean;
  // 是否显示按钮名字，
  showButtonName?: boolean;
  // 按钮名字配置，用来做多语言的
  buttonName?: IButtonName;
  zIndex?: number
}
```

## 数据格式

```ts
interface IFileItem {
  // 文件名称
  fileName: string;
  // 文件地址
  previewUrl: string;
  // 文件标识
  id: string;
}
```

## 示例代码

```ts
const files: IFileItem[] = [
  {
    fileName: '漂亮小姐姐',
    id: '123',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/4539b8ba767f4d77be26f822801b4dc9.jpg'
  },
  {
    fileName: '非常漂亮的小姐姐',
    id: '1234',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/f18f7dd660ef482e9cb31aeb02b9e674.jpg'
  },
  {
    fileName: '帅哥帅哥',
    id: 'handsometwo',
    previewUrl:
      'https://dfiles.tita.com/Portal/110006/dcb836403aa7409da9d6f315eedd4220.png'
  }
];

export default function Preivew() {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleDownload = (file: any) => {};
  return (
    <div>
      <button onClick={handleClick}>显示隐藏</button>
      {show && (
        <ImgPreview
          files={files}
          onClose={handleClose}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}
```
