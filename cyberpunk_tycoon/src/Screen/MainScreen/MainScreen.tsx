import { Stage, Sprite, Text, Container, Graphics } from "@pixi/react";
import { useCallback, useState } from "react";
import * as PIXI from "pixi.js";
import { BottomUI } from "../../Components/BottomUI";
import { TopUI } from "../../Components/TopUI"
import "./MainScreen.css";
import { Building } from "../../Components/Building";
import { Ground } from "../../Components/Ground";
import { useAtom } from "jotai";
import { buildingIDCounterAtom, buildingListAtom, buildingShapeListAtom } from "../../GameState/BuildingState";
import { BuildingInterface } from "../../interface/BuildingInterface";
import { roomIDCounterAtom } from "../../GameState/Room";

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
    const [buildingShapeList, setBuildingShapeList] = useAtom(buildingShapeListAtom);
    const [buildingIDCounter, setBuildingIDCounter] = useAtom(buildingIDCounterAtom);

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

    function makeBuilding() {
        //console.log("Making a new building");
        //console.log("buildingIDCounter: " + buildingIDCounter);

        // Add room dimensions to roomgraphicshapelist, and add room data to atom
        //console.log("Adding Building!")
        const buildingShape = {x: 400, y: 100 };
        const newDimensions = [...buildingShapeList, buildingShape];
        setBuildingShapeList(newDimensions);
        // Add room data to atom
        setBuildingIDCounter(incrementId(buildingIDCounter));
       // console.log("buildingIDCounter: " + buildingIDCounter);
        addBuildingData({
            id: buildingIDCounter,
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
                <Building key={0} id={0} bX={900} bY={100}/>
                {buildingShapeList.map((buildingGraphicShape:any, index: any) => {
                    return (
                        <Building
                            key={buildingList[index].id}
                            id={buildingList[index].id}
                            bX={buildingGraphicShape.x}
                            bY={buildingGraphicShape.y}
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