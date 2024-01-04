import { Stage, Sprite } from "@pixi/react";
import { TopUI } from "../../Components/TopUI"
import "./MainScreen.css";
import { Ground } from "../../Components/Ground";
import { useAtom } from "jotai";
import { buildingIDCounterAtom, buildingListAtom, buildingShapeListAtom } from "../../GameState/BuildingState";
import { BuildingInterface } from "../../interface/BuildingInterface";
import { roomIDCounterAtom } from "../../GameState/Room";
import { People } from "../../Components/People";
import { Building } from "../../Components/Building";

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
                <Sprite
                    image="https://pixijs.io/pixi-react/img/bunny.png"
                    x={400}
                    y={270}
                    anchor={{ x: 0, y: 0 }}
                />
                <Building/>
                <Ground/>
            </Stage>
        </div>
    );
};