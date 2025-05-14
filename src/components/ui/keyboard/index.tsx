import { useEffect } from 'react';

type Props = {
  keysPressed: { [index: string]: boolean };
}

const Keyboard = ({ keysPressed }: Props) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    keysPressed[e.key] = true;
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    delete keysPressed[e.key];
  }

  return(<></>);
}

export default Keyboard;
