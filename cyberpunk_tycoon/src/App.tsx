import './App.css';
import { $stage } from './GameState/startState';
import { StartScreen } from './Screen/StartScreen/StartScreen';
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
    </div>
  );
}

export default App;
