import { useEffect, useRef } from 'react';
import styles from './index.module.css';

type Props = {
  setOnGame: (onGame: boolean) => void;
}

const GamePrepare = ({ setOnGame }: Props) => {
  const elmRef = useRef<HTMLDivElement | null>(null);
  const preparedRef = useRef(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (preparedRef.current) return;
    if (
      !(e.key == 'a' || e.key == 'd' || e.key == 'ArrowLeft' || e.key == 'ArrowRight'
        || e.key == 'w' || e.key == 's' || e.key == 'ArrowUp' || e.key == 'ArrowDown'
        || e.key == 'e' || e.key == 'q' || e.key == 'x' || e.key == 'z')
    ) return;

    preparedRef.current = true;
    setOnGame(true);
    elmRef.current!.style.display = "none";
  };

  return (
    <div id="gamePrepare" className={styles.gamePrepare}>
      <div className={styles.gamePrepareHeader} ref={elmRef}>
        Press
        <img src="./arrows.png" className={styles.gamePrepareKeys}></img>
        or
        <img src="./wasd.png" className={styles.gamePrepareKeys}></img>
        <br />
        to start.
      </div>
    </div>
  );
}

export default GamePrepare;
