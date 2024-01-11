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
            <p className="instruct">
                Instructions:<br/>
                There is no goal! <br/><br/>
                The purpose of this game is to build buildings which can house two rooms. Build more rooms to make more profit at your company. 
                <br/><br/>Manage your COOPERATIVE employees as they are needed to generate profit in the room. More employees in a room, less time it takes to make profit! 
                <br/><br/>Have fun!
            </p>
            <button type="button" className="startButton" onClick={updateStage}>
                Start Game
            </button>
        </div>
    )
}