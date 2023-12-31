import { Container, Graphics } from "@pixi/react";
import { useCallback, useState } from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room } from "./Room";
import * as PIXI from "pixi.js";
import { useAtom } from "jotai";
import { idCounterAtom, roomsListAtom as roomListAtom, roomSelectors } from "../GameState/Room";
import { Room as roomInterface } from '../interface/Room';

/**
 * Building.tsx
 * 
 * Modular node for building graphics.
 * Also handles dynamic making of the Room component
 * 
 * 1 TODO - line 88
 * If Building is to be modular and able to be dynamically made then the
 *  x and y coords at line 88 need to be assigned by the parent component.
 * Which is currently MainScree.tsx
 * 
 */

export function Building(){

    const buildingWidth = 500;
    const buildingHeight = 600;
    const buildingXCoordinate = 0;
    const buildingYCoordinate = 0;
    
    const roomWidthPaddingPercent = 0.025;
    const roomHeightPercent = 0.4;

    // This useState holds information needed for Room component
    const [roomGraphicShapeList, setRoomGraphicShapeList] = useState<any>([]);
    const [roomList, setRoomList] = useAtom(roomListAtom);
    const [idCounter, setIdCounter] = useAtom(idCounterAtom);
    const [topRoomExists, setTopRoomExists] = useState<boolean>(false);
    const [bottomRoomExists, setBottomRoomExists] = useState<boolean>(false);

    const drawBuilding = useCallback((g: pixiGraphics) => {
        g.clear();
        g.beginFill(0xffffff);
        g.drawRect(buildingXCoordinate, buildingYCoordinate, buildingWidth, buildingHeight);
        g.endFill();
    },[])

    const incrementId = (id: number) => id+1;

    const addRoom = (newRoom: roomInterface) => {
        setRoomList((prevList: any) => [...prevList, newRoom]);
    };

    function makeRoomInBuilding() {
        console.log("Making a new room");
        console.log("IDCounter: " + idCounter);

        let roomXCoordinate = buildingXCoordinate + (buildingWidth * roomWidthPaddingPercent);
        const roomHeight = buildingHeight * roomHeightPercent;
        let roomYCoordinate = (buildingYCoordinate + buildingHeight) - roomHeight;

        // Depending on which room exists, change coords vars and change exists state
        if (topRoomExists === false && bottomRoomExists === true) {
            //Building extends height but not width, x never changes
            let nextRoomYCoordinate = 0;
            console.log("Adding Top Room!")
            let buildingHeightPadding = ((buildingHeight - (roomHeight*2))/2)
            console.log("Building hEIGHT pADDING: ", buildingHeightPadding)
            console.log("Room Height: ", roomHeight)
            // 200 - 180 - 180
            nextRoomYCoordinate = roomYCoordinate - buildingHeightPadding - roomHeight;
            roomYCoordinate = nextRoomYCoordinate
            console.log("Room Y: ", roomYCoordinate)
            setTopRoomExists(true)
        } else if (bottomRoomExists === false) {
            console.log("Adding Bottom Room!")
            console.log("Y: ", roomYCoordinate)
            setBottomRoomExists(true)
        }

        // Add room dimensions to roomgraphicshapelist, and add room data to atom
        if(topRoomExists === false || bottomRoomExists === false) {
            console.log("Adding Room!")
            const roomWidth = buildingWidth - (buildingWidth * roomWidthPaddingPercent * 2);
            const roomGraphicShape = {x: roomXCoordinate, y: roomYCoordinate, w: roomWidth, h: roomHeight};
            const newData = [...roomGraphicShapeList, roomGraphicShape];
            setRoomGraphicShapeList(newData);
            // Add room data to atom
            setIdCounter(incrementId(idCounter));
            console.log("IDCounter: " + idCounter);
            addRoom({
            id: idCounter,
            upgradeLevel: 2,
            cost: 150,
            baseIncome: 15,
            customerPresent: false,
            numOfEmployees: 1,
            baseMaintanceModifier: 120,
            baseTimeTaskCompletion: 3,
            taskComplete: false,
            });
        //console.log("room Id: " + roomList[idCounter].id);
            /*
            id: 1,
            upgradeLevel: 2,
            cost: 150,
            baseIncome: 15,
            customerPresent: false,
            numOfEmployees: 1,
            baseMaintanceModifier: 120,
            baseTimeTaskCompletion: 3,
            taskComplete: false,
            */
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
                {roomGraphicShapeList.map((roomGraphicShape:any, index: any) => {
                    return (
                        <Room
                            key={roomList[index].id}
                            data={roomList[index]}
                            rW={roomGraphicShape.w}
                            rX={roomGraphicShape.x}
                            rH={roomGraphicShape.h}
                            rY={roomGraphicShape.y}
                        />
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