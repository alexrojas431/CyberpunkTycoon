import MoneySystem from './ProfitSystem';

/**
 * This should switch between multiple different visual scenes
 *  the game.
 * EX: Start screen -> intro -> main game -> game over screen 
 *  -> end screen(replay or shut game off)
 */

export function App() {
  
//const stage = useAtomValue($stage)

  return (
    <div>
      <MoneySystem/>
    </div>
  );
}

export default App;
