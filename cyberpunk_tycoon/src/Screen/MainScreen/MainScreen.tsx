import { Stage, Sprite, Graphics } from "@pixi/react";
import { useCallback, useState } from "react";
import * as PIXI from "pixi.js";
import { BottomUI } from "../../Components/BottomUI";
import { TopUI } from "../../Components/TopUI"
import "./MainScreen.css";
import { Building } from "../../Components/Building";
import { Ground } from "../../Components/Ground";
import { useAtom } from "jotai";
import { buildingIDCounterAtom, buildingListAtom } from "../../GameState/BuildingState";
import { BuildingInterface } from "../../interface/BuildingInterface";

/**
 * MainScreen.tsx
 * 
 * Canvas that the player will be interacting with for the majority of their playtime
 * Houses most UI Elements/Components
 * Also handles dynamic making of the Building Component
 *  
*/

export function MainScreen(){

    //This atom holds dimensons info needed for Room component
    const [buildingList, setBuildingList] = useAtom(buildingListAtom);
    const [buildingIDCounter, setBuildingIDCounter] = useAtom(buildingIDCounterAtom);
    const [floor, setFloor] = useState<number>(100);

    const bButton = useCallback((g: PIXI.Graphics) => {
        g.clear();
        g.beginFill(0x1273DE);
        g.drawRect(0, 600, 100, 100);
        g.endFill();
    },[])

    const incrementId = (id: number) => id+1;

    const addBuildingData = (newBuilding: BuildingInterface) => {
        setBuildingList((prevList: any) => [...prevList, newBuilding]);
    };

    const startShape = {x: 1200, y: 100 };
    const maxLimits = {x: 200, y: -10000 };
    let buildingShape = startShape;
    
    function makeBuilding() {
        setBuildingIDCounter(incrementId(buildingIDCounter));
        
        if(buildingList.length != 0){
            const i = buildingList.length - 1;

            buildingShape.y = floor;
            if(buildingList[i].x != maxLimits.x){
                buildingShape.x = buildingList[i].x - 500;
            }
            else{
                buildingShape.y = buildingList[i].y - 600;
                setFloor(buildingShape.y);
            }
        }

        addBuildingData({
            id: buildingIDCounter,
            bottomRoomID: -10,
            topRoomID: -10,
            x: buildingShape.x,
            y: buildingShape.y,
        });
    };

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
                {buildingList.map((b: BuildingInterface) => {
                    return (
                        <Building
                            key={b.id}
                            id={b.id}
                            bX={b.x}
                            bY={b.y}
                        />
                    );
                })}
                <Graphics
                    draw={bButton}
                    eventMode="static" //Makes it interactable
                    cursor="pointer" // Adds a hand on windows machine only
                    onclick={makeBuilding}
                    hitArea={new PIXI.Rectangle(0, 600, 100, 100)}
                />
                <Ground/>
            </Stage>
        </div>
    );
};