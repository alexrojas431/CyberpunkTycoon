import { Stage, Sprite, Text, Container } from "@pixi/react";
import { BottomUI } from "../../Components/BottomUI";
import { TopUI } from "../../Components/TopUI"
import "./MainScreen.css";
import { Building } from "../../Components/Building";
import { Ground } from "../../Components/Ground";
import { useAtom } from "jotai";
import { buildingIDCounterAtom, buildingShapeListAtom } from "../../GameState/BuildingState";

/**
 * MainScreen.tsx
 * 
 * Canvas that the player will be interacting with for the majority of theirplaytime
 * Houses most UI Elements/Components
 * Also handles dynamic making of the Building Component
 *  
 * 1 TODO - line 88
 * If Building is to be modular and able to be dynamically made then the
 *  x and y coords at line 88 need to be assigned by the parent component.
 * Which is currently MainScreen.tsx
 * 
 */

export function MainScreen(){

    const [buildingShapeList, setBuildingShapeList] = useAtom(buildingShapeListAtom);
    const [buildingIDCounter, setBuildingIDCounter] = useAtom(buildingIDCounterAtom);

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
                <Text text="Hello World" anchor={{ x: -5, y: -1}} />
                <Building/>
                <Ground/>
            </Stage>
        </div>
    );
};