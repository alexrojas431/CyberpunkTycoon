import { Container, Graphics,Text } from "@pixi/react";
import { useCallback } from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room } from "./Room";
import * as PIXI from "pixi.js";

import { useAtom } from "jotai";
import { useState } from "react";
import { roomsListAtom, roomSelectors } from "../GameState/Room";
import { Room as roomInterface } from '../interface/Room';

export function Building(){

    const nextRoomXCoordinate = 0;
    const nextRoomYCoordinate = 0;

    const buildingWidth = 500;
    const buildingHeight = 600;
    const buildingXCoordinate = 0;
    const buildingYCoordinate = 0;
    
    const roomWidthPaddingPercent = 0.025;
    const roomHeightPercent = 0.4;
    const roomWidth = buildingWidth - (buildingWidth * roomWidthPaddingPercent * 2);
    const roomHeight = buildingHeight * roomHeightPercent;
    const roomXCoordinate = buildingXCoordinate + (buildingWidth * roomWidthPaddingPercent);
    const roomYCoordinate = (buildingYCoordinate + buildingHeight) - roomHeight;
    const [roomGraphicShapeList, setGraphicShapeList] = useState<any>([]);
    
    const drawBuilding = useCallback((g: pixiGraphics) => {
        g.clear();
        g.beginFill(0xffffff);
        g.drawRect(buildingXCoordinate, buildingYCoordinate, buildingWidth, buildingHeight);
        g.endFill();
    },[])

    const updateBuilding = useCallback((g: pixiGraphics) => {
        g.clear();
    },[])

    const makeRoomInBuilding = (e:any) => {
        console.log(e);
        console.log("Making a new room");
        const roomGraphicShape = {x: roomXCoordinate, y: roomYCoordinate, w: roomWidth, h: roomHeight};
        const newData = [...roomGraphicShapeList, roomGraphicShape];
        setGraphicShapeList(newData);
    };

    const gButton = useCallback((g:pixiGraphics) => {
        g.clear();
        g.beginFill(0x8c3b0c);
        g.drawRect(0, 200, 100, 100);
        g.endFill();
    },[])

    const [roomsList, setRoomsList] = useAtom(roomsListAtom);

    return(
        <Container>
            <Container x={500} y={100}>
                <Graphics draw={drawBuilding}/>
                {roomGraphicShapeList.map((roomGraphicShape:any, index: any)=> {
                    return (
                        <Room rW={roomGraphicShape.w} rX={roomGraphicShape.x} rH={roomGraphicShape.h} rY={roomGraphicShape.y}/>
                    );
                })}
            </Container>
            <Graphics
                    draw={gButton}
                    eventMode="static" //Makes it interactable
                    cursor="pointer" // Adds a hand on windows machine only
                    onclick={makeRoomInBuilding}
                    hitArea={new PIXI.Rectangle(0, 200, 100, 100)}
                />
        </Container>
    )
}