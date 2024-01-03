import { Container, Graphics } from "@pixi/react";
import { useCallback, useState } from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room } from "./Room";
import * as PIXI from "pixi.js";
import { Atom, useAtom } from "jotai";
import { roomIDCounterAtom, roomsListAtom as roomListAtom } from "../GameState/Room";
import { Room as roomInterface } from '../interface/Room';

/**
 * Building.tsx
 * 
 * Modular node for building graphics.
 * Also handles dynamic making of the Room component
 * 
*/

interface Props{
    readonly id: number;
    readonly bX: number;
    readonly bY: number;
}

export function Building(p: Props){

    console.log("-------------------\nBuilding ID from building comp: " + p.id);
    
    const buildingWidth = 500;
    const buildingHeight = 600;
    const buildingXCoordinate = 0;
    const buildingYCoordinate = 0;
    
    const roomWidthPaddingPercent = 0.025;
    const roomHeightPercent = 0.4;
    const roomHeight = buildingHeight * roomHeightPercent;
    const roomWidth = buildingWidth - (buildingWidth * roomWidthPaddingPercent * 2);

    const buildingHeightPadding = ((buildingHeight - (roomHeight*2))/2)
    
    // This atom holds information needed for Room component
    const [roomList, setRoomList] = useAtom(roomListAtom);
    const [roomIDCounter, setRoomIDCounter] = useAtom(roomIDCounterAtom);
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
        let roomXCoordinate = buildingXCoordinate + (buildingWidth * roomWidthPaddingPercent);
        let roomYCoordinate = (buildingYCoordinate + buildingHeight) - roomHeight;

        // Depending on which room exists, change coords vars and change exists state
        if (topRoomExists === false && bottomRoomExists === true) {
            //Building extends height but not width, x never changes
            let nextRoomYCoordinate = 0;
            // 200 - 180 - 180
            nextRoomYCoordinate = roomYCoordinate - buildingHeightPadding - roomHeight;
            roomYCoordinate = nextRoomYCoordinate
            setTopRoomExists(true)
        } else if (bottomRoomExists === false) {
            setBottomRoomExists(true)
        }

        // Add room dimensions to roomgraphicshapelist, and add room data to atom
        if(topRoomExists === false || bottomRoomExists === false) {
            // Add room data to atom
            const id = roomIDCounter;
            setRoomIDCounter(incrementId(roomIDCounter));
            //console.log("roomIDCounter: " + roomIDCounter);
            addRoom({
                id: id,
                x: roomXCoordinate,
                y: roomYCoordinate,
                upgradeLevel: 2,
                cost: 150,
                baseIncome: 15,
                customerPresent: false,
                numOfEmployees: 1,
                baseMaintanceModifier: 120,
                baseTimeTaskCompletion: 3,
                taskComplete: false,
            });
        }
    };

    const gButton = useCallback((g:pixiGraphics) => {
        g.clear();
        g.beginFill(0x8c3b0c);
        g.drawRect(p.bX, p.bY, 100, 100);
        g.endFill();
    },[])

    return(
        <Container>
            <Container x={p.bX} y={p.bY}>
                <Graphics draw={drawBuilding}/>
                {roomList.map((r:any, i: number) => {
                    console.log("----------\nRoomIDCounter at map: " + roomIDCounter)
                    console.log("roomlistID at map: " + r.id)
                    return (
                        <Room
                            key={roomList[i].id}
                            data={roomList[roomIDCounter-1]}
                            rW={roomWidth}
                            rX={r.x}
                            rH={roomHeight}
                            rY={r.y}
                        />
                    );
                })}
            </Container>
            <Graphics
                draw={gButton}
                eventMode="static"
                cursor="pointer"
                onclick={makeRoomInBuilding}
                hitArea={new PIXI.Rectangle(p.bX, p.bY, 100, 100)}
            />
        </Container>
    )
}