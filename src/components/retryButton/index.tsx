const RetryButton = () => {
  const reload = () => {
    const audioElm = document.getElementById('bgm') as HTMLAudioElement;
    sessionStorage.setItem('audioVolume', audioElm.volume.toString());
    location.reload();
  }

  return (
    <a href="#" onClick={() => reload()}>Retry</a>
  );
}

export default RetryButton;
