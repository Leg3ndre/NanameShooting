import { useEffect, useRef } from 'react';
import styles from './index.module.css';

const BgmAudio = () => {
  const INITIAL_VOLUME = 0.1;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (audioRef.current == null) return;
    if (
      !(e.key == 'a' || e.key == 'd' || e.key == 'ArrowLeft' || e.key == 'ArrowRight'
        || e.key == 'w' || e.key == 's' || e.key == 'ArrowUp' || e.key == 'ArrowDown'
        || e.key == 'e' || e.key == 'q' || e.key == 'x' || e.key == 'z')
    ) return;

    audioRef.current.volume = INITIAL_VOLUME;
    audioRef.current.play();
  }

  const title = 'Miss! Hit! Miss! Miss!';
  const composer = 'Mr.O';

  return(
    <div className={styles.bgm}>
      <audio id="bgm" src="./bgm.mp3" controls autoPlay loop ref={audioRef}>
        <p>お使いのブラウザでは再生できません</p>
      </audio>
      <span className={styles.bgmDesc}>
        BGM: <b>{title}</b> - <span className={styles.composer}>by {composer}</span>
      </span>
    </div>
  );
}

export default BgmAudio;
