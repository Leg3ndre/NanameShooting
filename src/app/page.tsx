import styles from './page.module.css';
import * as THREE from 'three';

export default function Home() {
  console.log('DEBUG:',THREE);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </main>
    </div>
  );
}
