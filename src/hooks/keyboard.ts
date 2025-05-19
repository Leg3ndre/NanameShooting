import { useEffect, useRef } from 'react';

const getKeysPressed = () => {
  const keysPressed = useRef<{ [index: string]: boolean }>({});

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    keysPressed.current[e.key] = true;
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    delete keysPressed.current[e.key];
  }

  return keysPressed.current;
}

export default getKeysPressed;
