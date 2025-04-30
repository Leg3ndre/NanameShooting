const animate = (callback: Function) => {
  const FPS = 60;
  let prevTime = 0;

  const tick = () => {
    const currentTime = Date.now();

    if (currentTime - prevTime > 1000.0 / FPS) {
      console.log('tick!', currentTime - prevTime);
      prevTime = currentTime;

      callback();
    }

    requestAnimationFrame(tick);
  }

  tick();
}

export default animate;
