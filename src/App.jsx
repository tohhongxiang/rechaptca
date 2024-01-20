import '@mantine/core/styles.css';
import Game from "./components/Game";

import { MantineProvider } from '@mantine/core';

export default function App() {
  console.log("Test")
  return (
    <MantineProvider>
        <Game />
    </MantineProvider>
  );
}