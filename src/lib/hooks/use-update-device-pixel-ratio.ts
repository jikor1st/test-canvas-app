import { useEffect } from 'react';

const useDevicePixelRatio = (callback?: (pixelRatio: number) => void) => {
  const handleMatchMedia = () => {
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    if (typeof callback === 'function') callback(pixelRatio);
  };
  useEffect(() => {
    window
      .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      .addListener(handleMatchMedia);

    return () => {
      window
        .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
        .removeListener(handleMatchMedia);
    };
  }, []);
};

export { useDevicePixelRatio };
