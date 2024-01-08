import { Stage, Sprite } from "@pixi/react";
import { Ground } from "../../Components/Ground";
import { Building } from "../../Components/Building";
import { TopUI } from "../../Components/TopUI"
import "./MainScreen.css";
import { People } from "../../Components/People";

/**
 * MainScreen.tsx
 * 
 * Canvas that the player will be interacting with for the majority of their playtime
 * Houses most UI Elements/Components
 * Also handles dynamic making of the Building Component
 *  
*/

export function MainScreen(){

    return (
        <div>
            <TopUI/> 
            <Stage 
                width={window.innerWidth}
                height={window.innerHeight}
                options={{backgroundColor:0xff6699,backgroundAlpha: 1}}
            >
                <Building/>
                <Ground/>
            </Stage>
        </div>
    );
};