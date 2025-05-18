import * as CONST from '@/constants/game';
import styles from './index.module.css';

type Props = {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
}

const GameDifficulty = ({ difficulty, setDifficulty }: Props) => {
  const radioButtons = [
    {
      label: "簡単モード（オブジェクトの影を表示）",
      value: CONST.DIFFICULTY_EASY,
    },
    {
      label: "普通モード",
      value: CONST.DIFFICULTY_NORMAL,
    },
    {
      label: "難関モード（遠近感をなくす）",
      value: CONST.DIFFICULTY_HARD,
    }
  ];

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.value);
  };

  return (
    <div className={styles.difficulty}>
      {
        radioButtons.map((radio) => {
          return(
            <label key={radio.value}>
              <input type="radio"
                name="difficulty"
                value={radio.value}
                checked={radio.value == difficulty}
                onChange={changeValue}
              />
              {radio.label}
            </label>
          );
        })
      }
    </div>
  );
}

export default GameDifficulty;
