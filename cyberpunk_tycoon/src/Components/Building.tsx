import { useCallback, useState } from "react";
import * as PIXI from "pixi.js";
import { Graphics, Text } from "@pixi/react";
import { useAtom } from "jotai";
import { buildingIDCounterAtom, buildingListAtom } from "../GameState/BuildingState";
import { BuildingInterface } from "../Interface/BuildingInterface";
import { BuildingSection } from "./BuildingSection";
import { totalProfitAtom } from "../GameState/EconomyState";

/**
 * Building.tsx
 * 
 * Modular node for building graphics.
 * Also handles dynamic making of the Room component
 * 
*/

export function Building(){
    //This atom holds dimensons info needed for Room component
    const [buildingList, setBuildingList] = useAtom(buildingListAtom);
    const [buildingIDCounter, setBuildingIDCounter] = useAtom(buildingIDCounterAtom);
    const [floor, setFloor] = useState<number>(700);
    const [totalProfit, setTotalProfit] = useAtom(totalProfitAtom);
    
    const startShape = {x: 1400, y: 700 };
    const maxLimits = {x: 400, y: -10000 };
    let buildingShape = startShape;

    const bButtonX = 0;
    const bButtonY = 1200;
    const bButtonW = 150;
    const bButtonH = 90;

    const bButton = useCallback((g: PIXI.Graphics) => {
        g.clear();
        g.beginFill(0x1273DE);
        g.drawRoundedRect(bButtonX, bButtonY, bButtonW, bButtonH, 20);
        g.endFill();
    },[])

    const incrementId = (id: number) => id+1;

    const addBuildingData = (newBuilding: BuildingInterface) => {
        setBuildingList((prevList: any) => [...prevList, newBuilding]);
    };
    
    function makeBuilding() {
        if(buildingIDCounter === 6){
            console.log("end")
        }
        else{
            setBuildingIDCounter(incrementId(buildingIDCounter));
            
            if(buildingList.length !== 0){
                
                const i = buildingList.length - 1;
                buildingShape.y = floor;

                if(buildingList[i].x !== maxLimits.x){
                    buildingShape.x = buildingList[i].x - 500;
                }
                else{
                    buildingShape.y = buildingList[i].y - 600;
                    setFloor(buildingShape.y);
                }
            }
            setTotalProfit(() => totalProfit - 500);
            addBuildingData({
                id: buildingIDCounter,
                bottomRoomID: -10,
                topRoomID: -10,
                x: buildingShape.x,
                y: buildingShape.y,
            });
        }
    };

    return(
        <>
            {buildingList.map((b: BuildingInterface) => {
                return (
                    <BuildingSection
                        key={b.id}
                        id={b.id}
                        bX={b.x}
                        bY={b.y}
                        bRoomId={b.bottomRoomID}
                        tRoomId={b.topRoomID}
                    />
                );
            })}
            <Graphics
                draw={bButton}
                eventMode="static" //Makes it interactable
                cursor="pointer" // Adds a hand on windows machine only
                onclick={makeBuilding}
                hitArea={new PIXI.Rectangle(bButtonX, bButtonY, bButtonW, bButtonH)}
            />
            <Text text={"Create\nBuilding"}
                x={0}
                y={1200}
                zIndex={1}
                style={new PIXI.TextStyle({fontSize: 36, fill: 'white', fontWeight: 'bold' })}
            />
        </>
    )
}