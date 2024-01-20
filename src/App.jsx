import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import Game from './components/Game';

export default function App() {
  return (
    <MantineProvider>
      <Game />
    </MantineProvider>
  );
}