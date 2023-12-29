import { UpdateStartState } from "../../GameState/UpdateState/UpdateStartState"
import logo from "./templogo.png"
import { $state } from "../../GameState/StartState"

export function StartScreen(){
    return(
        <div>
            <img src={logo} alt="temp" height={"100px"} />
        </div>
    )
}