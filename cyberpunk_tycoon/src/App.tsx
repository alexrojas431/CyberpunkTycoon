import './App.css';
import { $stage } from './GameState/StartState';
import { StartScreen } from './Screen/StartScreen/StartScreen';
import { MainScreen } from './Screen/MainScreen/MainScreen';
import { useAtomValue } from 'jotai';

/**
 * This should switch between multiple different visual scenes
 *  the game.
 * EX: Start screen -> intro -> main game -> game over screen 
 *  -> end screen(replay or shut game off)
 */

export function App() {
  
  const stage = useAtomValue($stage)

  return (
    <div className="App">
      {stage === "startScreen" && <StartScreen />}
      {stage === "mainGameplay" && <MainScreen />}
    </div>
  );
}

export default App;
