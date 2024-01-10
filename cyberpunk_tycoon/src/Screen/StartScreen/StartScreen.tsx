import { useAtom } from "jotai"
import { gameStateAtom } from "../../GameState/StartState";
import logo from "../../Assets/templogo.png"

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
        <div>
            <img src={logo} alt="temp" height={"100px"}/>
            <button type="button" onClick={updateStage}>
                Hello
            </button>
        </div>
    )
}