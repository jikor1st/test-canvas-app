import { useCallback, useEffect, useRef, useMemo } from 'react';
import PolyfillResizeObserver from 'resize-observer-polyfill';

//hooks
import { useConditionEffect } from '@/lib/hooks';

type ResizeObserverCallback = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => void;

const useResizeObserver = (
  element: HTMLElement | null,
  callback: ResizeObserverCallback,
) => {
  console.log('element: ', element);
  // const observer = useRef<ResizeObserver | null>(null);

  // const handleResizeObserver = useCallback((entries: ResizeObserverEntry[]) => {
  //   console.log('asdf');
  //   for (let entry of entries) {
  //     const { inlineSize, blockSize } = Array.isArray(entry.contentBoxSize)
  //       ? entry.contentBoxSize[0]
  //       : (entry.contentBoxSize as ResizeObserverSize[]);
  //     console.log(inlineSize);
  //     if (typeof callback === 'function')
  //       callback({
  //         width: inlineSize,
  //         height: blockSize,
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!element) return;
  //   observer.current = window.ResizeObserver
  //     ? new ResizeObserver(handleResizeObserver)
  //     : new PolyfillResizeObserver(handleResizeObserver);
  //   observer.current.observe(element);
  //   return () => {
  //     if (!observer.current) return;
  //     observer.current.unobserve(element);
  //     observer.current.disconnect();
  //   };
  // }, [element]);
};

export { useResizeObserver };
