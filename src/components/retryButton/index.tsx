const RetryButton = () => {
  const reload = () => {
    const audioElm = document.getElementById('bgm') as HTMLAudioElement;
    sessionStorage.setItem('audioVolume', audioElm.volume.toString());
    location.reload();
  }

  return (
    <div>
      <a href="#" onClick={() => reload()}>Retry</a>
    </div>
  );
}

export default RetryButton;
