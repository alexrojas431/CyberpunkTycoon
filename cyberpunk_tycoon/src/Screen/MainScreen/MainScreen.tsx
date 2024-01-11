import { Sprite, Stage } from "@pixi/react";
import { Ground } from "./Ground";
import { Building } from "../../Components/Building";
import { TopUI } from "./TopUI"
import "./CSS/MainScreen.css";
import cyberpunkCity from "./../../Assets/cyberCity.png";
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
                options={{backgroundAlpha: 1}}
            >
                <Sprite image={cyberpunkCity} width={stageWidth} height={stageHeight}/>
                <Building/>
                <Ground width={stageWidth}/>
            </Stage>
        </div>
    );
};