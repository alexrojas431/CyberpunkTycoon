import { useAtom } from "jotai"
import { gameStateAtom } from "../../GameState/StartState";
import logo from "../../Assets/cyberpunkTycoonlogo.png"
import "./StartScreen.css";

export function StartScreen(){
    
    const [gameState, setGameState] = useAtom(gameStateAtom);

    function updateStage(){
        setGameState({
            ...gameState,
            player:{
                ...gameState.player,
                stage: "mainGameplay"
            }
        });
    }

    return(
        <div className="startScreen">
            <img src={logo} alt="temp" height={"100px"}/>
            <p>
                Instructions:<br/>
                Currently you can make buildings and buy 2 rooms within those buildings.
            </p>
            <button type="button" onClick={updateStage}>
                Start Game
            </button>
        </div>
    )
}