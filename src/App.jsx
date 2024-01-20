import '@mantine/core/styles.css';
import Game from "./components/Game";

import { MantineProvider } from '@mantine/core';

export default function App() {
  return (
    <MantineProvider>
        <Game />
    </MantineProvider>
  );
}