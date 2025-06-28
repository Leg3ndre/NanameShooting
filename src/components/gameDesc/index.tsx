import styles from './index.module.css';

const GameDesc = () => {
  return (
    <div className={styles.desc}>
      <p className={styles.abstract}>
        固定視点の3Dシューティングゲームです。
        プレイヤーから見て右上にカメラが固定されているため、上移動と左移動の区別は遠近感でがんばってください。
      </p>
      <ul className={styles.playManual}>
        <li>画面右から次々現れる敵を倒し、スコアを稼いでください</li>
        <li>プレイヤーが操作する自機は赤い紙飛行機です。敵に弾を当てると倒すことができます</li>
        <li>敵の弾が自機に当たるとライフが減ります</li>
        <li>※ Safariでのプレイは想定通りのゲーム速度にならない可能性が高いため非推奨です</li>
        <li>操作方法</li>
          <ul>
            <li>↑ or W: 上へ移動</li>
            <li>↓ or S: 下へ移動</li>
            <li>← or A: 左へ移動</li>
            <li>→ or D: 右へ移動</li>
            <li>X or E: 前へ移動</li>
            <li>Z or Q: 後ろへ移動</li>
            <li>Space or Enter: 弾を発射</li>
          </ul>
      </ul>
    </div>
  );
}

export default GameDesc;
