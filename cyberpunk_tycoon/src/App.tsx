import { StartScreen } from './Screen/StartScreen/StartScreen';
import { MainScreen } from './Screen/MainScreen/MainScreen';
import { gameStateAtom } from './GameState/StartState';
import { useAtom } from 'jotai';

/**
 * This should switch between multiple different visual scenes
 *  the game.
 * EX: Start screen -> intro -> main game -> game over screen 
 *  -> end screen(replay or shut game off)
 */

export function App() {
  
  const [gameState] = useAtom(gameStateAtom); 

  return (
    <div>
        {gameState.player.stage === "startScreen" && <StartScreen />}
        {gameState.player.stage === "mainGameplay" && <MainScreen />}
    </div>
  );
}

export default App;