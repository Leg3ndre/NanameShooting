import * as CONST from '@/constants/game';
import { useCallback, useEffect, useRef } from 'react';

const SAMPLE_FRAMES_NUM = 100;

const useAnimateEffect = (callback: () => void, setActualFps: (actualFps: number) => void) => {
  const frameIdRef = useRef(0);
  const prevTime = useRef(0);
  const prevMeasureFpsTime = useRef(0);
  const actualFps = useRef(0.0);
  const sampleFrames = useRef<number[]>([]);

  const tick = useCallback(() => {
    frameIdRef.current = requestAnimationFrame(tick);

    const currentTime = Date.now();
    if (currentTime - prevTime.current < 1000.0 / CONST.FPS) return;

    prevTime.current = currentTime;
    callback();
    updateActualFps();
  }, [callback]);

  const updateActualFps = () => {
    const currentTime = Date.now();
    sampleFrames.current.push(currentTime);
    sampleFrames.current = sampleFrames.current.slice(-SAMPLE_FRAMES_NUM);
    if (currentTime - prevMeasureFpsTime.current < 1000.0) return;

    prevMeasureFpsTime.current = currentTime;
    actualFps.current = sampleFrames.current.length / ((currentTime - sampleFrames.current[0]) / 1000.0);
    setActualFps(Math.round(actualFps.current * 10) / 10.0);
  }

  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [tick]);
}

export default useAnimateEffect;
