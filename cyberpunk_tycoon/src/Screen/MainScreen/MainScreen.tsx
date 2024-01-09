import { Stage } from "@pixi/react";
import { Ground } from "./Ground";
import { Building } from "../../Components/Building";
import { TopUI } from "./TopUI"
import "./CSS/MainScreen.css";
import { Viewport } from "./Viewport";

/**
 * MainScreen.tsx
 * 
 * Canvas that the player will be interacting with for the majority of their playtime
 * Houses most UI Elements/Components
 * Also handles dynamic making of the Building Component
 *  
*/
export function MainScreen(){
    
    const stageWidth = 2000;
    const stageHeight = 1500;

    return (
        <div>
            <TopUI/> 
            <Stage 
                width={stageWidth}
                height={stageHeight}
                options={{backgroundColor:0xff6699,backgroundAlpha: 1}}
            >
                <Building/>
                <Ground width={stageWidth}/>
            </Stage>
        </div>
    );
};