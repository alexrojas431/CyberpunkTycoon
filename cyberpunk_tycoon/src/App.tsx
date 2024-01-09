//import { $stage } from './GameState/StartState';
import { StartScreen } from './Screen/StartScreen/StartScreen';
import { MainScreen } from './Screen/MainScreen/MainScreen';

/**
 * This should switch between multiple different visual scenes
 *  the game.
 * EX: Start screen -> intro -> main game -> game over screen 
 *  -> end screen(replay or shut game off)
 */

export function App() {
  
let stage = "mainGameplay";

  return (
    <div>
        {stage === "startScreen" && <StartScreen />}
        {stage === "mainGameplay" && <MainScreen />}
    </div>
  );
}

export default App;