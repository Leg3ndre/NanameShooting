import * as CONST from '@/constants/game';
import { useCallback, useEffect, useRef } from 'react';

const useAnimateEffect = (callback: () => void, setActualFps: (actualFps: number) => void) => {
  const frameIdRef = useRef(0);
  const prevTime = useRef(0);
  const actualFps = useRef(0.0001);

  const tick = useCallback(() => {
    frameIdRef.current = requestAnimationFrame(tick);

    const currentTime = Date.now();
    if (currentTime - prevTime.current < 1000.0 / CONST.FPS) return;

    prevTime.current = currentTime;
    setActualFps(actualFps.current);
    callback();
  }, [callback]);

  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [tick]);
}

export default useAnimateEffect;
