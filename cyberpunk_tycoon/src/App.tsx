import { StartScreen } from './Screen/StartScreen/StartScreen';
import { MainScreen } from './Screen/MainScreen/MainScreen';
import { gameStateAtom } from './GameState/StartState';
import { useAtom } from 'jotai';
import { totalProfitAtom } from './GameState/EconomyState';

/**
 * This should switch between multiple different visual scenes
 *  the game.
 * EX: Start screen -> intro -> main game -> game over screen 
 *  -> end screen(replay or shut game off)
 */

export function App() {
  
  const [gameState] = useAtom(gameStateAtom); 
  /*
  const [totalProfit] = useAtom(totalProfitAtom); 

  if(totalProfit <= 0){
      console.log("GameOver");
  }
  else if(totalProfit >= 3000){
      console.log("You win");
  }
  */
 
  return (
    <div>
        {gameState.player.stage === "startScreen" && <StartScreen />}
        {gameState.player.stage === "mainGameplay" && <MainScreen />}
    </div>
  );
}

export default App;