import './App.css';
import { StartScreen } from './Screen/StartScreen';

function App() {
  return (
    <div className="App">
      {stage === "startScreen" ? <StartScreen/>}
    </div>
  );
}

export default App;
