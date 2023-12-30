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

    let id = 0

    const nextRoomXCoordinate = 0;
    const nextRoomYCoordinate = 0;

    const buildingWidth = 500;
    const buildingHeight = 600;
    const buildingXCoordinate = 0;
    const buildingYCoordinate = 0;
    
    const roomWidthPaddingPercent = 0.025;
    const roomHeightPercent = 0.4;
    const [roomGraphicShapeList, setGraphicShapeList] = useState<any>([]);
    const [roomsList, setRoomsList] = useAtom(roomsListAtom);
    const [topRoomExist, setIsTopRoomAdded] = useState<boolean>(false);
    const [bottomRoomExist, setIsBottomRoomAdded] = useState<boolean>(false);

    
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

        let roomXCoordinate = buildingXCoordinate + (buildingWidth * roomWidthPaddingPercent);
        const roomHeight = buildingHeight * roomHeightPercent;
        let roomYCoordinate = (buildingYCoordinate + buildingHeight) - roomHeight;

        if (topRoomExist == false && bottomRoomExist == true) {
            let nextRoomYCoordinate = 0;
            console.log("Adding Top Room!")
            let buildingHeightPadding = ((buildingHeight - (roomHeight*2))/2)
            console.log("Building hEIGHT pADDING: ", buildingHeightPadding)
            console.log("Room Height: ", roomHeight)
            nextRoomYCoordinate = roomYCoordinate - buildingHeightPadding - roomHeight; // 200 - 180 - 180
            roomYCoordinate = nextRoomYCoordinate
            console.log("Room Y: ", roomYCoordinate)
            setIsTopRoomAdded(true)
        } else if (bottomRoomExist == false) {
            console.log("Adding Bottom Room!")
            console.log("Y: ", roomYCoordinate)
            setIsBottomRoomAdded(true)
        }

        if(topRoomExist == false || bottomRoomExist == false) {
            console.log("Adding Room!")
            const roomWidth = buildingWidth - (buildingWidth * roomWidthPaddingPercent * 2);
            const roomGraphicShape = {x: roomXCoordinate, y: roomYCoordinate, w: roomWidth, h: roomHeight};
            const newData = [...roomGraphicShapeList, roomGraphicShape];
            setGraphicShapeList(newData);
        }
    };

    const gButton = useCallback((g:pixiGraphics) => {
        g.clear();
        g.beginFill(0x8c3b0c);
        g.drawRect(0, 200, 100, 100);
        g.endFill();
    },[])

    return(
        <Container>
            <Container x={500} y={100}>
                <Graphics draw={drawBuilding}/>
                {roomGraphicShapeList.map((roomGraphicShape:any, index: any)=> {
                    return (
                        <Room key={index} rW={roomGraphicShape.w} rX={roomGraphicShape.x} rH={roomGraphicShape.h} rY={roomGraphicShape.y}/>
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