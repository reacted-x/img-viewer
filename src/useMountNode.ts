import {useMemo, useEffect} from 'react';

export default function useMountNode(className: string):HTMLDivElement {
  let node = useMemo(() => {
    let div = document.createElement('div');
    div.className = className;
    return div;
  },[className]);

  useEffect(() => {
    document.body.appendChild(node);
    return () => {
      document.body.removeChild(node);
    }
  }, [node])
  return node;
}
