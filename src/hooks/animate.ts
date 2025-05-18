import * as CONST from '@/constants/game';
import { useCallback, useEffect, useRef } from 'react';

const animate = (callback: () => void) => {
  const frameIdRef = useRef(0);
  const FPS = CONST.FPS;
  let prevTime = 0;

  const tick = useCallback(() => {
    frameIdRef.current = requestAnimationFrame(tick);

    const currentTime = Date.now();
    if (currentTime - prevTime < 1000.0 / FPS) return;

    prevTime = currentTime;
    callback();
  }, [callback]);

  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(tick);
    // return () => cancelAnimationFrame(frameIdRef.current);
  }, [tick]);
}

export default animate;
